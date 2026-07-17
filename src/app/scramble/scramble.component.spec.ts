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

describe('ScrambleComponent experimental line', () => {

  let component: ScrambleComponent;

  beforeEach(() => {
    localStorage.removeItem(STORAGE_KEY);
    component = new ScrambleComponent(new TrackingFeedbackService());
  });

  afterEach(() => {
    localStorage.removeItem(STORAGE_KEY);
  });

  // Level 8 always has an alternative line worth showing.
  it('reveals the solution and the experimental line', () => {
    component.minLevel = 8;
    component.maxLevel = 8;
    component.newScramble();
    component.toggleSolution();

    expect(component.solution).not.toBe('');
    expect(component.humanReveal).not.toBeNull();
    expect(component.pairReveal.length).toBe(4);
  });

  // Hiding then re-showing must reuse the cached solve, not recompute it.
  it('reuses the cached solve across hide/show', () => {
    component.minLevel = 8;
    component.maxLevel = 8;
    component.newScramble();
    component.toggleSolution();
    const line = component.humanReveal!.moves;
    const hold = component.humanReveal!.holdColour;

    component.toggleSolution(); // hide
    component.toggleSolution(); // show again

    expect(component.humanReveal!.moves).toBe(line);
    expect(component.humanReveal!.holdColour).toBe(hold);
  });
});
