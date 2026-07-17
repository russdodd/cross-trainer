// Renders the README's impact charts as committed SVG.
//
// GitHub markdown can't run a plotting library, so the chart is emitted as a
// plain SVG and committed. Two files are produced (light and dark) and the README
// picks between them with <picture media="(prefers-color-scheme: dark)">, which is
// GitHub's supported way to theme an image. A single SVG with an embedded media
// query is not reliable once GitHub proxies it through camo.
//
// Colours are the data-viz reference palette. Each chart is a single series
// (magnitude across an ordered level), so the rule is one hue per chart, no legend
// - the title says what is plotted. Two sequential contexts appear at once, so the
// second takes the next slot's hue (green). Both validated against both surfaces
// with the palette validator: all checks pass.

const THEMES = {
  light: {
    surface: '#fcfcfb',
    textPrimary: '#0b0b0b',
    textSecondary: '#52514e',
    grid: '#e6e5e2',
    series: { changed: '#2a78d6', extra: '#008300' },
  },
  dark: {
    surface: '#1a1a19',
    textPrimary: '#ffffff',
    textSecondary: '#c3c2b7',
    grid: '#33322f',
    series: { changed: '#3987e5', extra: '#008300' },
  },
};

// Panel geometry. Two stacked panels share one x scale (level 1-8) and one y
// scale (0-100%) - the same unit on both, so the two charts stay honestly
// comparable. Never give them different y-maxima to make the small one look big.
const W = 720;
const PANEL_H = 200;
const PAD = { top: 34, right: 16, bottom: 30, left: 38 };
const GAP = 34;
const H = PANEL_H * 2 + GAP + 16;
const Y_MAX = 100;
const BAR_MAX = 24; // mark spec: bars never fill the band
// Bars cap at 24px but "100%" renders ~27px wide, so a value label can never sit
// inside one — it would spill past the fill and, in surface ink, disappear. Labels
// always ride above the bar end, and the scale reserves this gutter so a 100% bar
// still has somewhere to put one.
const LABEL_GUTTER = 18;

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function panel(rows, { title, subtitle, key, colour, t, offsetY }) {
  const plotW = W - PAD.left - PAD.right;
  const plotH = PANEL_H - PAD.top - PAD.bottom;
  const y0 = offsetY + PAD.top + plotH;
  const band = plotW / rows.length;
  const barW = Math.min(BAR_MAX, band - 14); // leftover band is air
  const scaleH = plotH - LABEL_GUTTER;
  const yOf = (v) => y0 - (v / Y_MAX) * scaleH;

  const out = [];
  out.push(`<text x="${PAD.left}" y="${offsetY + 14}" fill="${t.textPrimary}" font-size="14" font-weight="600">${esc(title)}</text>`);
  out.push(`<text x="${PAD.left}" y="${offsetY + 29}" fill="${t.textSecondary}" font-size="11">${esc(subtitle)}</text>`);

  // gridlines: hairline, solid, recessive; labelled on the left
  for (const v of [0, 25, 50, 75, 100]) {
    const y = yOf(v);
    out.push(`<line x1="${PAD.left}" y1="${y.toFixed(1)}" x2="${W - PAD.right}" y2="${y.toFixed(1)}" stroke="${t.grid}" stroke-width="1"/>`);
    out.push(`<text x="${PAD.left - 7}" y="${(y + 3.5).toFixed(1)}" fill="${t.textSecondary}" font-size="10" text-anchor="end">${v}%</text>`);
  }

  rows.forEach((r, i) => {
    const v = r[key];
    const x = PAD.left + band * i + (band - barW) / 2;
    const h = Math.max(0, (v / Y_MAX) * scaleH);
    const y = y0 - h;
    // 4px rounded data-end, square at the baseline
    const rad = Math.min(4, h);
    const d = h <= 0.5
      ? ''
      : `M${x.toFixed(1)},${y0.toFixed(1)} L${x.toFixed(1)},${(y + rad).toFixed(1)} Q${x.toFixed(1)},${y.toFixed(1)} ${(x + rad).toFixed(1)},${y.toFixed(1)} ` +
        `L${(x + barW - rad).toFixed(1)},${y.toFixed(1)} Q${(x + barW).toFixed(1)},${y.toFixed(1)} ${(x + barW).toFixed(1)},${(y + rad).toFixed(1)} ` +
        `L${(x + barW).toFixed(1)},${y0.toFixed(1)} Z`;
    if (d) {
      out.push(`<path d="${d}" fill="${colour}"/>`);
    }
    // Every bar carries its value, which the "label selectively" rule normally
    // forbids. It earns the exception here: 8 bars is not a flood, and a committed
    // SVG has no tooltip and no table to fall back on, so the labels are the only
    // way to read a value off the figure. (The README also ships a table, which is
    // what screen readers get — SVG text inside an <img> is not exposed.)
    out.push(
      `<text x="${(x + barW / 2).toFixed(1)}" y="${(y - 6).toFixed(1)}" ` +
      `fill="${t.textPrimary}" font-size="11" font-weight="600" text-anchor="middle">${Math.round(v)}%</text>`
    );
    out.push(`<text x="${(x + barW / 2).toFixed(1)}" y="${(y0 + 15).toFixed(1)}" fill="${t.textSecondary}" font-size="11" text-anchor="middle">${r.level}</text>`);
  });

  out.push(`<line x1="${PAD.left}" y1="${y0.toFixed(1)}" x2="${W - PAD.right}" y2="${y0.toFixed(1)}" stroke="${t.grid}" stroke-width="1"/>`);
  out.push(`<text x="${(W / 2).toFixed(1)}" y="${(offsetY + PANEL_H - 1).toFixed(1)}" fill="${t.textSecondary}" font-size="10" text-anchor="middle">cross difficulty (moves to solve)</text>`);
  return out.join('\n  ');
}

/** rows: [{ level, changedPct, extraPct }] */
export function renderImpactChart(rows, mode) {
  const t = THEMES[mode];
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif" role="img" aria-label="Impact of the experimental cross ranker by difficulty level">
  <rect width="${W}" height="${H}" fill="${t.surface}"/>
  ${panel(rows, {
    title: 'Scrambles given a genuinely different solution',
    subtitle: 'a different sequence of turns from the solver’s — not its line re-held (that is counted separately)',
    key: 'changedPct',
    colour: t.series.changed,
    t,
    offsetY: 8,
  })}
  ${panel(rows, {
    title: 'Scrambles where the recommendation spends an extra move',
    subtitle: 'one turn longer than the shortest possible, taken only when it beats every shortest line by a clear margin',
    key: 'extraPct',
    colour: t.series.extra,
    t,
    offsetY: 8 + PANEL_H + GAP,
  })}
</svg>
`;
}
