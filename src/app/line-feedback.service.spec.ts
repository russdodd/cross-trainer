import { LineFeedbackRecord, LineFeedbackService } from './line-feedback.service';

const STORAGE_KEY = 'cross-trainer.line-feedback.v1';

function aRecord(overrides: Partial<LineFeedbackRecord> = {}): LineFeedbackRecord {
  return {
    timestamp: '2026-07-16T10:00:00.000Z',
    level: 5,
    scrambleIndex: 42,
    scramble: "R U R' F",
    choice: 'A',
    recommendedSide: 'A',
    agreed: true,
    holdsOnly: false,
    extraMoves: 0,
    ergoRecommended: 6.1,
    ergoSolver: 8.3,
    movesRecommended: "R D R",
    holdRecommended: 'blue',
    movesSolver: "L D L",
    holdSolver: 'green',
    ...overrides,
  };
}

describe('LineFeedbackService', () => {

  let service: LineFeedbackService;

  beforeEach(() => {
    localStorage.removeItem(STORAGE_KEY);
    service = new LineFeedbackService();
  });

  afterEach(() => {
    localStorage.removeItem(STORAGE_KEY);
  });

  it('starts empty', () => {
    expect(service.all()).toEqual([]);
    expect(service.count()).toBe(0);
  });

  it('round-trips a recorded vote', () => {
    const entry = aRecord();
    service.record(entry);

    expect(service.count()).toBe(1);
    expect(service.all()[0]).toEqual(entry);
  });

  it('appends rather than overwriting', () => {
    service.record(aRecord({ choice: 'A' }));
    service.record(aRecord({ choice: 'B' }));

    expect(service.all().map(r => r.choice)).toEqual(['A', 'B']);
  });

  // Votes collected over weeks of practice must outlive the tab they were made in.
  it('persists across service instances', () => {
    service.record(aRecord());

    expect(new LineFeedbackService().count()).toBe(1);
  });

  it('forgets everything after clear', () => {
    service.record(aRecord());
    service.clear();

    expect(service.all()).toEqual([]);
  });

  it('falls back to empty when the stored value is corrupt', () => {
    localStorage.setItem(STORAGE_KEY, '{not json');

    expect(service.all()).toEqual([]);
  });

  it('falls back to empty when the stored value is not an array', () => {
    localStorage.setItem(STORAGE_KEY, '{"choice":"A"}');

    expect(service.all()).toEqual([]);
  });

  it('keeps a disagreeing vote distinguishable from an equal one', () => {
    service.record(aRecord({ choice: 'B', recommendedSide: 'A', agreed: false }));
    service.record(aRecord({ choice: 'equal', recommendedSide: 'A', agreed: null }));

    expect(service.all().map(r => r.agreed)).toEqual([false, null]);
  });

  describe('toCsv', () => {

    it('emits a header and one row per record, in column order', () => {
      service.record(aRecord());
      const [header, row, ...rest] = service.toCsv().split('\n');

      expect(header).toBe(
        'timestamp,level,scrambleIndex,scramble,choice,recommendedSide,agreed,holdsOnly,' +
        'extraMoves,ergoRecommended,ergoSolver,movesRecommended,holdRecommended,movesSolver,holdSolver'
      );
      expect(row).toBe(
        "2026-07-16T10:00:00.000Z,5,42,R U R' F,A,A,true,false,0,6.1,8.3,R D R,blue,L D L,green"
      );
      expect(rest).toEqual([]);
    });

    it('emits just the header when there is nothing recorded', () => {
      expect(service.toCsv().split('\n').length).toBe(1);
    });

    it('writes an empty cell for an equal vote rather than the string "null"', () => {
      service.record(aRecord({ choice: 'equal', agreed: null }));
      const row = service.toCsv().split('\n')[1];

      expect(row.split(',')[6]).toBe('');
    });

    it('quotes cells containing a comma or quote', () => {
      service.record(aRecord({ scramble: 'R2, U"' }));
      const row = service.toCsv().split('\n')[1];

      expect(row).toContain('"R2, U"""');
    });
  });
});
