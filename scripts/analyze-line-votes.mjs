// Reads a line-votes CSV (Dev tools → vote on the experimental line → Download
// CSV) and reports whether the ranker agrees with your hands.
//
// The ranker picks by algSpeed plus a hold, so a vote is a referendum on exactly
// those two things. These slices turn that into evidence:
//
//   holdsOnly=true   - both lines are the same moves and only the hold differs,
//                      so this slice measures the hold advice on its own.
//   extraMoves=1     - the ranker paid EXTRA_MOVE_MARGIN for a longer line.
//                      Low agreement here means the margin is too cheap.
//   by face          - is a disagreement an undrilled fingertrick or a model that
//                      does not fit these hands? See the note further down.
//
// Usage: node scripts/analyze-line-votes.mjs <path-to-csv>

import { readFileSync } from 'node:fs';

const path = process.argv[2];
if (!path) {
  console.error('usage: node scripts/analyze-line-votes.mjs <path-to-csv>');
  process.exit(1);
}

// Minimal CSV reader matching the quoting the exporter emits (csvCell in
// line-feedback.service.ts): quotes only when the cell has a comma/quote/newline.
function parseCsv(text) {
  const rows = [];
  let row = [];
  let cell = '';
  let quoted = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (quoted) {
      if (ch === '"') {
        if (text[i + 1] === '"') {
          cell += '"';
          i++;
        } else {
          quoted = false;
        }
      } else {
        cell += ch;
      }
    } else if (ch === '"') {
      quoted = true;
    } else if (ch === ',') {
      row.push(cell);
      cell = '';
    } else if (ch === '\n') {
      row.push(cell);
      rows.push(row);
      row = [];
      cell = '';
    } else if (ch !== '\r') {
      cell += ch;
    }
  }
  if (cell !== '' || row.length) {
    row.push(cell);
    rows.push(row);
  }
  return rows;
}

const rows = parseCsv(readFileSync(path, 'utf8').trim());
const header = rows.shift();
const records = rows.map((r) => Object.fromEntries(r.map((v, i) => [header[i], v])));

if (!records.length) {
  console.log('No votes in that CSV yet.');
  process.exit(0);
}

// agreed is blank for an "equal" verdict, which is neither agreement nor
// disagreement - it must not be counted as either.
const decided = records.filter((r) => r.agreed === 'true' || r.agreed === 'false');
const equal = records.filter((r) => r.choice === 'equal');
const agreedOf = (rs) => rs.filter((r) => r.agreed === 'true').length;

function report(label, rs) {
  const count = `${rs.length} vote${rs.length === 1 ? '' : 's'}`.padStart(9);
  const d = rs.filter((r) => r.agreed === 'true' || r.agreed === 'false');
  if (!d.length) {
    console.log(`  ${label.padEnd(26)} ${count}   (none decided)`);
    return;
  }
  const pct = ((100 * agreedOf(d)) / d.length).toFixed(0);
  const eq = rs.length - d.length;
  console.log(
    `  ${label.padEnd(26)} ${count}   ${String(pct).padStart(3)}% agree` +
    `   (${agreedOf(d)}/${d.length} decided${eq ? `, ${eq} equal` : ''})`
  );
}

console.log(`${records.length} votes, ${decided.length} decided, ${equal.length} called equal\n`);

console.log('Overall');
report('all votes', records);

console.log('\nIs the hold advice real?');
report('hold only (same moves)', records.filter((r) => r.holdsOnly === 'true'));
report('different moves', records.filter((r) => r.holdsOnly === 'false'));

console.log('\nIs EXTRA_MOVE_MARGIN right?');
report('optimal length (+0)', records.filter((r) => r.extraMoves === '0'));
report('one extra move (+1)', records.filter((r) => r.extraMoves === '1'));

console.log('\nBy level');
for (let level = 1; level <= 8; level++) {
  const rs = records.filter((r) => Number(r.level) === level);
  if (rs.length) {
    report(`level ${level}`, rs);
  }
}

// Is a disagreement your gap, or the model's?
//
// algSpeed is one hobbyist's model of one grip style, and it was built to score
// OLL/PLL algs from a settled home grip — not cross solutions executed cold out
// of inspection. So a disagreement can genuinely mean the model is wrong for your
// hands. It can also mean you haven't drilled that fingertrick.
//
// These slices separate the two. If your "no" votes pile up on lines containing a
// particular face, that face is the story — B and L are the usual suspects, since
// they are the ones people drill least. If disagreement is flat across every face,
// no single fingertrick explains it and the model is the likelier culprit.
console.log('\nWhen you disagree, what was in the line you rejected?');
console.log('(a spike on one face suggests an undrilled fingertrick; flat suggests the model)');
for (const face of ['R', 'L', 'U', 'D', 'F', 'B']) {
  // the recommended line is the one being judged, so slice on its moves
  const withFace = records.filter((r) => r.movesRecommended.split(/\s+/).some((m) => m[0] === face));
  if (withFace.length) {
    report(`recommendation had ${face}`, withFace);
  }
}

// A face the recommendation uses and the solver's line does not is the sharpest
// version of the same question: it is exactly what our advice added.
console.log('\nFaces our line introduced that the solver\'s line did not:');
for (const face of ['R', 'L', 'U', 'D', 'F', 'B']) {
  const has = (moves) => moves.split(/\s+/).some((m) => m[0] === face);
  const introduced = records.filter((r) => has(r.movesRecommended) && !has(r.movesSolver));
  if (introduced.length) {
    report(`we added ${face}`, introduced);
  }
}

// A 50% agreement rate means the ranking is no better than a coin flip on that
// slice - worth saying out loud rather than leaving in the numbers.
const overall = decided.length ? (100 * agreedOf(decided)) / decided.length : NaN;
console.log('');
if (decided.length < 20) {
  console.log(`Only ${decided.length} decided votes — too few to conclude anything yet. Aim for 20+ per slice.`);
} else if (overall < 55) {
  console.log(`Overall agreement ${overall.toFixed(0)}% is near chance: the ranking is not tracking your judgement.`);
} else {
  console.log(`Overall agreement ${overall.toFixed(0)}%.`);
}
