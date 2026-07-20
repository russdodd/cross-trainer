// Instantiated directly rather than through TestBed: these exercise the rating
// and vote state machines, which need no template.

import { ScrambleComponent } from './scramble.component';
import { TrackingFeedbackService } from '../tracking-feedback.service';

const STORAGE_KEY = 'cross-trainer.tracking-feedback.v1';

describe('ScrambleComponent rating box', () => {

  let feedback: TrackingFeedbackService;
  let component: ScrambleComponent;

  beforeEach(() => {
    localStorage.removeItem(STORAGE_KEY);
    feedback = new TrackingFeedbackService();
    component = new ScrambleComponent(feedback);
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

  it('cannot submit with neither question answered', () => {
    component.newScramble();

    expect(component.canSubmit).toBe(false);
    component.submitRating();
    expect(feedback.count()).toBe(0);
  });

  // Neither question is individually required — only that at least one is
  // answered. A vote on same/different alone, with no difficulty opinion,
  // is a valid submission.
  it('can submit with only the match answered, leaving the rating null', () => {
    component.newScramble();
    component.toggleSolution();
    component.selectMatch('same');

    expect(component.canSubmit).toBe(true);
    component.submitRating();

    expect(feedback.count()).toBe(1);
    expect(feedback.all()[0].rating).toBeNull();
    expect(feedback.all()[0].solutionMatch).toBe('same');
  });

  it('records one row on submit', () => {
    component.newScramble();
    component.selectRating('too-hard');
    component.submitRating();

    expect(feedback.count()).toBe(1);
    expect(feedback.all()[0].rating).toBe('too-hard');
  });

  it('records the same/different answer alongside the rating', () => {
    component.newScramble();
    component.toggleSolution();
    component.selectRating('ok');
    component.selectMatch('different');
    component.submitRating();

    expect(feedback.all()[0].solutionMatch).toBe('different');
  });

  // same/different is optional — a rating submits fine without it.
  it('records a null match when the question is left unanswered', () => {
    component.newScramble();
    component.selectRating('ok');
    component.submitRating();

    expect(feedback.count()).toBe(1);
    expect(feedback.all()[0].solutionMatch).toBeNull();
  });

  it('only offers the same/different question once the solution is revealed', () => {
    component.newScramble();
    expect(component.canRateMatch).toBe(false);
    component.toggleSolution();
    expect(component.canRateMatch).toBe(true);
  });

  it('clears the same/different answer on a new scramble', () => {
    component.newScramble();
    component.toggleSolution();
    component.selectMatch('same');
    component.newScramble();

    expect(component.selectedMatch).toBeNull();
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

describe('ScrambleComponent solution reveal', () => {

  let component: ScrambleComponent;

  beforeEach(() => {
    localStorage.removeItem(STORAGE_KEY);
    component = new ScrambleComponent(new TrackingFeedbackService());
  });

  afterEach(() => {
    localStorage.removeItem(STORAGE_KEY);
  });

  const revealLevel8 = () => {
    component.minLevel = 8;
    component.maxLevel = 8;
    component.newScramble();
    component.toggleSolution();
  };

  it('reveals the recommended line, its hold and turn speed', () => {
    revealLevel8();

    expect(component.solution).not.toBe('');
    expect(component.holdColour).not.toBe('');
    expect(component.turnSpeed).toBeGreaterThan(0);
    expect(component.pairReveal.length).toBe(4);
  });

  it('reads the same solution from the data on every reveal', () => {
    revealLevel8();
    const moves = component.solution;
    const hold = component.holdColour;

    component.toggleSolution(); // hide
    component.toggleSolution(); // show again

    expect(component.solution).toBe(moves);
    expect(component.holdColour).toBe(hold);
  });

  it('clears the solution and its hold when hidden', () => {
    revealLevel8();
    component.toggleSolution(); // hide

    expect(component.solution).toBe('');
    expect(component.holdColour).toBe('');
    expect(component.turnSpeed).toBe(0);
  });
});
