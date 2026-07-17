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
      service.record(aRecord());
      const [header, row, ...rest] = service.toCsv().split('\n');

      expect(header).toBe('timestamp,rating,level,grade,bandFilter,solutionRevealed,scrambleIndex,scramble');
      expect(row).toBe('2026-07-16T10:00:00.000Z,too-hard,5,hard,hard,true,42,R U R\' F');
      expect(rest).toEqual([]);
    });

    it('emits just the header when there is nothing recorded', () => {
      expect(service.toCsv().split('\n').length).toBe(1);
    });

    it('quotes cells containing a comma or quote', () => {
      service.record(aRecord({ scramble: 'R2, U"' }));
      const row = service.toCsv().split('\n')[1];

      expect(row.endsWith('"R2, U"""')).toBe(true);
    });
  });
});
