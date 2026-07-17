// Instantiated directly rather than through TestBed: these exercise the rating
// and vote state machines, which need no template.

import { ScrambleComponent } from './scramble.component';
import { TrackingFeedbackService } from '../tracking-feedback.service';
import { LineFeedbackService } from '../line-feedback.service';

const STORAGE_KEY = 'cross-trainer.tracking-feedback.v1';
const LINE_STORAGE_KEY = 'cross-trainer.line-feedback.v2';

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

describe('ScrambleComponent line verdict', () => {

  let lineFeedback: LineFeedbackService;
  let component: ScrambleComponent;

  // Level 8 always has an alternative worth judging, so `judgement` is never null.
  const revealLevel8 = () => {
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

  it('has nothing to judge before a solution is revealed', () => {
    component.newScramble();

    expect(component.judgement).toBeNull();
    expect(component.canSubmitLine).toBe(false);
  });

  it('cannot submit without picking a verdict', () => {
    revealLevel8();

    expect(component.judgement).not.toBeNull();
    expect(component.canSubmitLine).toBe(false);
    component.submitLineVote();
    expect(lineFeedback.count()).toBe(0);
  });

  it('records the verdict with the lines it was judging', () => {
    revealLevel8();
    const j = component.judgement!;

    component.selectLineVerdict('better');
    component.submitLineVote();

    const row = lineFeedback.all()[0];
    expect(row.verdict).toBe('better');
    expect(row.movesRecommended).toBe(j.movesRecommended);
    expect(row.holdRecommended).toBe(j.holdRecommended);
    expect(row.movesSolver).toBe(j.movesSolver);
    expect(row.ergoRecommended).toBe(j.ergoRecommended);
    expect(row.level).toBe(8);
  });

  // A "worse" verdict is the whole point of collecting these — it must record as
  // readily as agreement does.
  it('records a dissenting verdict just the same', () => {
    revealLevel8();

    component.selectLineVerdict('worse');
    component.submitLineVote();

    expect(lineFeedback.all()[0].verdict).toBe('worse');
  });

  it('does not record a second verdict for the same reveal', () => {
    revealLevel8();
    component.selectLineVerdict('better');
    component.submitLineVote();
    component.submitLineVote();

    expect(lineFeedback.count()).toBe(1);
  });

  it('ignores a verdict change after submitting', () => {
    revealLevel8();
    component.selectLineVerdict('better');
    component.submitLineVote();

    component.selectLineVerdict('worse');

    expect(component.lineVerdict).toBe('better');
    expect(lineFeedback.all()[0].verdict).toBe('better');
  });

  it('clears the verdict when a new scramble is drawn', () => {
    revealLevel8();
    component.selectLineVerdict('better');
    component.submitLineVote();

    component.newScramble();

    expect(component.lineVoted).toBe(false);
    expect(component.lineVerdict).toBeNull();
    expect(component.judgement).toBeNull();
  });

  it('reveals the solution and the experimental line without any gating', () => {
    revealLevel8();

    expect(component.solution).not.toBe('');
    expect(component.humanReveal).not.toBeNull();
    expect(component.pairReveal.length).toBe(4);
  });
});
