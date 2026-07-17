// Instantiated directly rather than through TestBed: these exercise the rating
// and vote state machines, which need no template.

import { ScrambleComponent } from './scramble.component';
import { TrackingFeedbackService } from '../tracking-feedback.service';
import { LineFeedbackService } from '../line-feedback.service';

const STORAGE_KEY = 'cross-trainer.tracking-feedback.v1';
const LINE_STORAGE_KEY = 'cross-trainer.line-feedback.v1';

describe('ScrambleComponent rating box', () => {

  let feedback: TrackingFeedbackService;
  let component: ScrambleComponent;

  beforeEach(() => {
    localStorage.removeItem(STORAGE_KEY);
    feedback = new TrackingFeedbackService();
    // The line-vote store is a separate experiment; these specs only drive the
    // pair-tracking rating box, but the constructor needs it.
    component = new ScrambleComponent(feedback, new LineFeedbackService());
  });

  afterEach(() => {
    localStorage.removeItem(STORAGE_KEY);
  });

  it('cannot submit before a scramble exists', () => {
    component.selectRating('ok');

    expect(component.canSubmit).toBe(false);
    component.submitRating();
    expect(feedback.count()).toBe(0);
  });

  it('cannot submit without picking a rating', () => {
    component.newScramble();

    expect(component.canSubmit).toBe(false);
    component.submitRating();
    expect(feedback.count()).toBe(0);
  });

  it('records one row on submit', () => {
    component.newScramble();
    component.selectRating('too-hard');
    component.submitRating();

    expect(feedback.count()).toBe(1);
    expect(feedback.all()[0].rating).toBe('too-hard');
  });

  // The forgot-if-I-clicked case: a second Submit on the same scramble is a
  // duplicate of one judgement, not a second vote.
  it('does not record a second row when submit is clicked again', () => {
    component.newScramble();
    component.selectRating('too-hard');
    component.submitRating();
    component.submitRating();
    component.submitRating();

    expect(feedback.count()).toBe(1);
  });

  it('reports the count as 1 after repeated submits', () => {
    component.newScramble();
    component.selectRating('ok');
    component.submitRating();
    component.submitRating();

    expect(component.feedbackCount).toBe(1);
  });

  it('closes submission for the scramble once submitted', () => {
    component.newScramble();
    component.selectRating('ok');
    component.submitRating();

    expect(component.submitted).toBe(true);
    expect(component.canSubmit).toBe(false);
  });

  it('ignores a rating change after submitting, and does not record it', () => {
    component.newScramble();
    component.selectRating('ok');
    component.submitRating();

    component.selectRating('too-hard');

    expect(component.selectedRating).toBe('ok');
    expect(feedback.count()).toBe(1);
    expect(feedback.all()[0].rating).toBe('ok');
  });

  // Gating is on the Get Scramble click, not the scramble's identity — seeing the
  // same case again tomorrow is a genuine second data point.
  it('records again after a new scramble is drawn', () => {
    component.newScramble();
    component.selectRating('too-hard');
    component.submitRating();

    component.newScramble();
    expect(component.submitted).toBe(false);
    expect(component.selectedRating).toBeNull();

    component.selectRating('too-easy');
    component.submitRating();

    expect(feedback.count()).toBe(2);
    expect(feedback.all().map(r => r.rating)).toEqual(['too-hard', 'too-easy']);
  });

  it('records twice for the same scramble when redrawn between votes', () => {
    component.newScramble();
    component.selectRating('ok');
    component.submitRating();

    const scramble = component.scramble;
    // Force the identical scramble to come round again.
    component.newScramble();
    component.scramble = scramble;
    component.selectRating('ok');
    component.submitRating();

    const rows = feedback.all();
    expect(rows.length).toBe(2);
    expect(rows[1].scramble).toBe(scramble);
  });
});

describe('ScrambleComponent blind line vote', () => {

  let lineFeedback: LineFeedbackService;
  let component: ScrambleComponent;

  // Level 8 always has an alternative worth comparing, so the A/B is never null.
  const drawWithComparison = () => {
    component.minLevel = 8;
    component.maxLevel = 8;
    component.newScramble();
    component.toggleSolution();
  };

  beforeEach(() => {
    localStorage.removeItem(LINE_STORAGE_KEY);
    lineFeedback = new LineFeedbackService();
    component = new ScrambleComponent(new TrackingFeedbackService(), lineFeedback);
  });

  afterEach(() => {
    localStorage.removeItem(LINE_STORAGE_KEY);
    localStorage.removeItem(STORAGE_KEY);
  });

  it('does not build a comparison when blind mode is off', () => {
    component.minLevel = 8;
    component.maxLevel = 8;
    component.newScramble();
    component.toggleSolution();

    expect(component.comparison).toBeNull();
    expect(component.voteVisible).toBe(false);
    expect(component.revealVisible).toBe(true);
  });

  // The point of the whole exercise: if the answer leaks before the vote, the
  // vote is worthless.
  it('hides the reveal until the vote is in', () => {
    component.toggleBlindMode();
    drawWithComparison();

    expect(component.voteVisible).toBe(true);
    expect(component.revealVisible).toBe(false);

    component.selectLine('A');
    component.submitLineVote();

    expect(component.revealVisible).toBe(true);
    expect(component.voteVisible).toBe(false);
  });

  it('cannot submit without picking a side', () => {
    component.toggleBlindMode();
    drawWithComparison();

    expect(component.canSubmitLine).toBe(false);
    component.submitLineVote();
    expect(lineFeedback.count()).toBe(0);
  });

  it('records agreement when the pick matches the recommended side', () => {
    component.toggleBlindMode();
    drawWithComparison();

    component.selectLine(component.comparison!.recommendedSide);
    component.submitLineVote();

    expect(lineFeedback.count()).toBe(1);
    expect(lineFeedback.all()[0].agreed).toBe(true);
  });

  it('records disagreement when the pick is the other side', () => {
    component.toggleBlindMode();
    drawWithComparison();

    const other = component.comparison!.recommendedSide === 'A' ? 'B' : 'A';
    component.selectLine(other);
    component.submitLineVote();

    expect(lineFeedback.all()[0].agreed).toBe(false);
  });

  // "equal" is a verdict in its own right, not a failure to agree.
  it('records an equal vote as neither agreed nor disagreed', () => {
    component.toggleBlindMode();
    drawWithComparison();

    component.selectLine('equal');
    component.submitLineVote();

    expect(lineFeedback.all()[0].agreed).toBeNull();
  });

  it('does not record a second vote for the same reveal', () => {
    component.toggleBlindMode();
    drawWithComparison();

    component.selectLine('A');
    component.submitLineVote();
    component.submitLineVote();

    expect(lineFeedback.count()).toBe(1);
  });

  it('stores the recommended line under the recommended columns, whichever side it was shown on', () => {
    component.toggleBlindMode();
    drawWithComparison();

    const c = component.comparison!;
    const ours = c.recommendedSide === 'A' ? c.a : c.b;
    component.selectLine('A');
    component.submitLineVote();

    const row = lineFeedback.all()[0];
    expect(row.movesRecommended).toBe(ours.moves);
    expect(row.holdRecommended).toBe(ours.holdColour);
    expect(row.ergoRecommended).toBe(ours.ergo);
  });

  it('starts the reveal over when blind mode is toggled mid-solution', () => {
    component.minLevel = 8;
    component.maxLevel = 8;
    component.newScramble();
    component.toggleSolution();
    expect(component.solution).not.toBe('');

    component.toggleBlindMode();

    expect(component.solution).toBe('');
    expect(component.comparison).toBeNull();
  });

  it('clears the vote when a new scramble is drawn', () => {
    component.toggleBlindMode();
    drawWithComparison();
    component.selectLine('A');
    component.submitLineVote();

    component.newScramble();

    expect(component.lineVoted).toBe(false);
    expect(component.lineChoice).toBeNull();
    expect(component.comparison).toBeNull();
  });
});
