import { TrackingFeedbackRecord, TrackingFeedbackService } from './tracking-feedback.service';

const STORAGE_KEY = 'cross-trainer.tracking-feedback.v1';

function aRecord(overrides: Partial<TrackingFeedbackRecord> = {}): TrackingFeedbackRecord {
  return {
    timestamp: '2026-07-16T10:00:00.000Z',
    rating: 'too-hard',
    level: 5,
    grade: 'hard',
    bandFilter: 'hard',
    solutionRevealed: true,
    solutionMatch: null,
    pairAware: false,
    scrambleIndex: 42,
    scramble: "R U R' F",
    ...overrides,
  };
}

describe('TrackingFeedbackService', () => {

  let service: TrackingFeedbackService;

  beforeEach(() => {
    localStorage.removeItem(STORAGE_KEY);
    service = new TrackingFeedbackService();
  });

  afterEach(() => {
    localStorage.removeItem(STORAGE_KEY);
  });

  it('starts empty', () => {
    expect(service.all()).toEqual([]);
    expect(service.count()).toBe(0);
  });

  it('round-trips a recorded rating', () => {
    const entry = aRecord();
    service.record(entry);

    expect(service.count()).toBe(1);
    expect(service.all()[0]).toEqual(entry);
  });

  it('appends rather than overwriting', () => {
    service.record(aRecord({ rating: 'too-hard' }));
    service.record(aRecord({ rating: 'ok' }));

    expect(service.all().map(r => r.rating)).toEqual(['too-hard', 'ok']);
  });

  // The whole point of the box: ratings collected over weeks of practice must
  // outlive the tab they were made in.
  it('persists across service instances', () => {
    service.record(aRecord());

    expect(new TrackingFeedbackService().count()).toBe(1);
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
    localStorage.setItem(STORAGE_KEY, '{"rating":"ok"}');

    expect(service.all()).toEqual([]);
  });

  describe('toCsv', () => {

    it('emits a header and one row per record, in column order', () => {
      service.record(aRecord({ solutionMatch: 'different' }));
      const [header, row, ...rest] = service.toCsv().split('\n');

      expect(header).toBe('timestamp,rating,level,grade,bandFilter,solutionRevealed,solutionMatch,pairAware,scrambleIndex,scramble');
      expect(row).toBe('2026-07-16T10:00:00.000Z,too-hard,5,hard,hard,true,different,false,42,R U R\' F');
      expect(rest).toEqual([]);
    });

    it('leaves the solutionMatch cell empty when it was not answered', () => {
      service.record(aRecord({ solutionMatch: null }));
      const row = service.toCsv().split('\n')[1];

      // ...,solutionRevealed,solutionMatch,pairAware,scrambleIndex,... → the empty cell between true and false
      expect(row).toContain(',true,,false,42,');
    });

    it('leaves the pairAware cell empty on rows recorded before the field existed', () => {
      const legacy = aRecord();
      delete (legacy as any).pairAware;
      service.record(legacy);
      const row = service.toCsv().split('\n')[1];

      expect(row).toContain(',true,,,42,');
    });

    it('emits just the header when there is nothing recorded', () => {
      expect(service.toCsv().split('\n').length).toBe(1);
    });

    // Submit only requires one of rating / solutionMatch (ScrambleComponent.canSubmit),
    // so either can legitimately be null on a stored row.
    it('leaves the rating cell empty when only solutionMatch was answered', () => {
      service.record(aRecord({ rating: null, solutionMatch: 'same' }));
      const row = service.toCsv().split('\n')[1];

      expect(row).toContain(',,5,hard,hard,true,same,false,42,');
    });

    it('quotes cells containing a comma or quote', () => {
      service.record(aRecord({ scramble: 'R2, U"' }));
      const row = service.toCsv().split('\n')[1];

      expect(row.endsWith('"R2, U"""')).toBe(true);
    });
  });
});
