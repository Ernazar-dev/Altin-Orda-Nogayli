import { del, get, http, post, put } from './client';
import type {
  Activity,
  ActivityAttemptResult,
  AnalyticsFilter,
  AnalyticsOverview,
  AnswerSubmission,
  ByClassRow,
  ByCriterionRow,
  ByTestRow,
  ComparisonEntry,
  Diagnostic,
  DiagnosticKind,
  DiagnosticResult,
  EducationalValue,
  FeedFilter,
  GrowthRow,
  LevelsRow,
  Level,
  LevelThreshold,
  LText,
  Period,
  ResultsFeed,
  ResultsSummary,
  Source,
  StudentRow,
  Test,
  TestResult,
  Thinker,
  TimelineEvent,
  User,
  ViewEntity,
} from '@/types';

export type Payload = Record<string, unknown>;
type Params = Record<string, string | number | undefined>;

export interface Resource<T> {
  list: (params?: Params) => Promise<T[]>;
  get: (id: string) => Promise<T>;
  create: (body: Payload) => Promise<T>;
  update: (id: string, body: Payload) => Promise<T>;
  remove: (id: string) => Promise<void>;
}

function resource<T>(path: string): Resource<T> {
  return {
    list: (params) => get<T[]>(path, params),
    get: (id) => get<T>(`${path}/${id}`),
    create: (body) => post<T>(path, body),
    update: (id, body) => put<T>(`${path}/${id}`, body),
    remove: (id) => del(`${path}/${id}`),
  };
}

export const periodsApi = resource<Period>('/periods');
export const valuesApi = resource<EducationalValue>('/values');
export const sourcesApi = resource<Source>('/sources');
export const activitiesApi = {
  ...resource<Activity>('/activities'),
  attempt: (id: string, optionId: string) =>
    post<ActivityAttemptResult>(`/activities/${id}/attempt`, { optionId }),
};
export const testsApi = {
  ...resource<Test>('/tests'),
  submit: (id: string, answers: AnswerSubmission[]) => post<TestResult>(`/tests/${id}/submit`, { answers }),
};
export const diagnosticsApi = {
  ...resource<Diagnostic>('/diagnostics'),
  submit: (id: string, answers: AnswerSubmission[]) =>
    post<DiagnosticResult>(`/diagnostics/${id}/submit`, { answers }),
  byKind: (kind: DiagnosticKind) => get<Diagnostic[]>('/diagnostics', { kind }),
};
export const timelineApi = resource<TimelineEvent>('/timeline');
export const comparisonsApi = resource<ComparisonEntry>('/comparisons');

export const thinkersApi = {
  ...resource<Thinker>('/thinkers'),
  linkValue: (id: string, body: { valueId: string; description?: LText; sourceId?: string }) =>
    post<unknown>(`/thinkers/${id}/values`, body),
  unlinkValue: (id: string, valueId: string) => del(`/thinkers/${id}/values/${valueId}`),
};

/** Backend natijalarni yangidan-eskiga beradi; UI esa eskidan-yangiga kutadi. */
function normalizeResults(r: ResultsSummary): ResultsSummary {
  const asc = <T extends { createdAt: string }>(xs: T[]): T[] =>
    [...xs].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  return { ...r, tests: asc(r.tests), diagnostics: asc(r.diagnostics), level: r.level ?? null };
}

export const resultsApi = {
  me: async () => normalizeResults(await get<ResultsSummary>('/results/me')),
  ofStudent: async (id: string) => normalizeResults(await get<ResultsSummary>(`/students/${id}/results`)),
  /** Ustoz: o'quvchilar topshirgan testlar, diagnostika va topshiriqlar (yangisi birinchi). */
  feed: (params?: { kind?: FeedFilter; classLevel?: number; q?: string; limit?: number }) => get<ResultsFeed>('/results/feed', params),
};

export const progressApi = {
  view: (entityType: ViewEntity, entityId: string) =>
    post<unknown>('/progress/view', { entityType, entityId }).catch(() => undefined),
};

interface RawStudent extends StudentRow {
  averagePercent?: number | null;
}

export const studentsApi = {
  list: async (params?: { classLevel?: number; q?: string }): Promise<StudentRow[]> => {
    const rows = await get<RawStudent[]>('/students', params);
    return rows.map((r) => ({ ...r, average: r.average ?? r.averagePercent ?? null }));
  },
  get: (id: string) => get<User>(`/students/${id}`),
};

export const settingsApi = {
  levels: () => get<LevelThreshold[]>('/settings/levels'),
  saveLevels: (levels: LevelThreshold[]) => put<LevelThreshold[]>('/settings/levels', levels),
};

export const uploadApi = {
  image: async (file: File): Promise<string> => {
    const form = new FormData();
    form.append('file', file);
    const res = await http.post<{ data: { url: string } }>('/uploads/image', form);
    return res.data.data.url;
  },
};

function filterParams(f: AnalyticsFilter): Params {
  return {
    classLevel: f.classLevel,
    studentId: f.studentId,
    testId: f.testId,
    criterion: f.criterion,
    kind: f.kind,
  };
}

interface RawCriterionRow {
  criterion: ByCriterionRow['criterion'];
  percent?: number | null;
  overall?: number | null;
}
interface RawClassRow {
  classLevel: number | null;
  students: number;
  averagePercent: number | null;
}
interface RawGrowth {
  students: GrowthRow[];
}
type RawLevels = LevelsRow[] | { overall: Record<Level, number> };

export const analyticsApi = {
  overview: (f: AnalyticsFilter = {}) => get<AnalyticsOverview>('/analytics/overview', filterParams(f)),
  byClass: async (f: AnalyticsFilter = {}): Promise<ByClassRow[]> => {
    const rows = await get<RawClassRow[]>('/analytics/by-class', filterParams(f));
    return rows.map((r) => ({ classLevel: r.classLevel, students: r.students, averagePercent: r.averagePercent }));
  },
  byCriterion: async (f: AnalyticsFilter = {}): Promise<ByCriterionRow[]> => {
    const rows = await get<RawCriterionRow[]>('/analytics/by-criterion', filterParams(f));
    return rows.map((r) => ({ criterion: r.criterion, percent: r.percent ?? r.overall ?? null }));
  },
  byTest: (f: AnalyticsFilter = {}) => get<ByTestRow[]>('/analytics/by-test', filterParams(f)),
  growth: async (f: AnalyticsFilter = {}): Promise<GrowthRow[]> => {
    const raw = await get<GrowthRow[] | RawGrowth>('/analytics/diagnostic-growth', filterParams(f));
    return Array.isArray(raw) ? raw : raw.students;
  },
  levels: async (f: AnalyticsFilter = {}): Promise<LevelsRow[]> => {
    const raw = await get<RawLevels>('/analytics/levels', filterParams(f));
    if (Array.isArray(raw)) return raw;
    return (['HIGH', 'MEDIUM', 'LOW'] as Level[]).map((level) => ({ level, count: raw.overall[level] ?? 0 }));
  },
  exportCsv: async (f: AnalyticsFilter = {}): Promise<Blob> => {
    const res = await http.get<Blob>('/analytics/export.csv', { params: filterParams(f), responseType: 'blob' });
    return res.data;
  },
};
