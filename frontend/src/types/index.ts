export type Lang = 'uz' | 'kaa';
export interface LText {
  uz?: string;
  kaa?: string;
}

export type Role = 'TEACHER' | 'STUDENT';
export type Criterion = 'AXIOLOGICAL' | 'COGNITIVE' | 'ACTIVITY' | 'REFLECTIVE';
export type Level = 'HIGH' | 'MEDIUM' | 'LOW';
export type SourceType =
  | 'DOSTON'
  | 'TOLGOV'
  | 'RIVOYAT'
  | 'TARIXIY_ASAR'
  | 'OGZAKI_IJOD'
  | 'ADABIY_ASAR'
  | 'BOSHQA';
export type ActivityType = 'SOURCE_ANALYSIS' | 'THOUGHT_ANALYSIS' | 'MODERN_LINK';
export type DiagnosticKind = 'INITIAL' | 'FINAL';
export type TimelineKind = 'DAVR' | 'VOQEA' | 'MUTAFAKKIR' | 'ASAR' | 'GOYA';
export type ReviewStatus = 'DRAFT' | 'REVIEWED';
export type ValueCategory =
  | 'AXIOLOGICAL'
  | 'INTELLECTUAL'
  | 'PATRIOTIC'
  | 'FAMILY'
  | 'LABOR'
  | 'COMMUNICATIVE'
  | 'AESTHETIC'
  | 'REFLECTIVE'
  | 'SOCIAL';

export const CRITERIA: Criterion[] = ['AXIOLOGICAL', 'COGNITIVE', 'ACTIVITY', 'REFLECTIVE'];
export const LEVELS: Level[] = ['HIGH', 'MEDIUM', 'LOW'];
export const SOURCE_TYPES: SourceType[] = [
  'DOSTON',
  'TOLGOV',
  'RIVOYAT',
  'TARIXIY_ASAR',
  'OGZAKI_IJOD',
  'ADABIY_ASAR',
  'BOSHQA',
];
export const ACTIVITY_TYPES: ActivityType[] = ['SOURCE_ANALYSIS', 'THOUGHT_ANALYSIS', 'MODERN_LINK'];
export const VALUE_CATEGORIES: ValueCategory[] = [
  'AXIOLOGICAL',
  'INTELLECTUAL',
  'PATRIOTIC',
  'FAMILY',
  'LABOR',
  'COMMUNICATIVE',
  'AESTHETIC',
  'REFLECTIVE',
  'SOCIAL',
];
export const TIMELINE_KINDS: TimelineKind[] = ['DAVR', 'VOQEA', 'MUTAFAKKIR', 'ASAR', 'GOYA'];

export interface User {
  id: string;
  fullName: string;
  username: string;
  role: Role;
  classLevel: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface AuthPayload {
  token: string;
  user: User;
}

export interface ApiEnvelope<T> {
  data: T;
  meta?: Record<string, unknown>;
}

export interface ApiErrorBody {
  error: { code: string; message: string; details?: unknown };
}

export interface Period {
  id: string;
  name: LText;
  startYear: number | null;
  endYear: number | null;
  shortDescription: LText;
  content: LText;
  image?: string | null;
  order: number;
  thinkers?: Thinker[];
  sources?: Source[];
}

export interface ThinkerValueLink {
  value: EducationalValue;
  description?: LText | null;
  source?: Source | null;
}

export interface Thinker {
  id: string;
  name: string;
  periodId: string;
  period?: Period;
  birthYear?: number | null;
  deathYear?: number | null;
  biography: LText;
  mainIdeas: LText;
  educationalViews: LText;
  modernImportance: LText;
  image?: string | null;
  reviewStatus: ReviewStatus;
  values?: ThinkerValueLink[];
  works?: Source[];
}

export interface ValueThinkerLink {
  thinker: Thinker;
  description?: LText | null;
  source?: Source | null;
}

export interface EducationalValue {
  id: string;
  name: LText;
  description: LText;
  modernInterpretation: LText;
  category: ValueCategory;
  thinkers?: ValueThinkerLink[];
  sources?: Source[];
  reviewStatus?: ReviewStatus;
}

export interface Source {
  id: string;
  title: LText;
  type: SourceType;
  periodId: string;
  thinkerId?: string | null;
  thinker?: Thinker | null;
  period?: Period | null;
  content: string;
  excerpt: string;
  description: LText;
  educationalMeaning: LText;
  dissertationNote?: LText | null;
  reference: string;
  image?: string | null;
  valueIds?: string[];
  reviewStatus?: ReviewStatus;
}

export interface ActivityOption {
  id: string;
  text: LText;
  isCorrect?: boolean;
  explanation?: LText | null;
}

export interface Activity {
  id: string;
  type: ActivityType;
  title: LText;
  prompt: LText;
  sourceId?: string | null;
  source?: Source | null;
  periodId?: string | null;
  thinkerId?: string | null;
  criterion: Criterion;
  options: ActivityOption[];
  attempted?: boolean;
  reviewStatus?: ReviewStatus;
}

export interface ActivityAttemptResult {
  isCorrect: boolean;
  correctOptionId: string;
  explanation: LText;
  /** Tanlangan (noto'g'ri) variantga alohida izoh, backend bersa. */
  chosenExplanation?: LText | null;
  modernExample?: LText | null;
}

export interface TestOption {
  id: string;
  text: LText;
  isCorrect?: boolean;
}

export interface TestQuestion {
  id: string;
  question: LText;
  order: number;
  criterion: Criterion;
  options: TestOption[];
}

export interface Test {
  id: string;
  title: LText;
  description: LText;
  periodId?: string | null;
  thinkerId?: string | null;
  questionCount: number;
  createdBy: string;
  questions?: TestQuestion[];
}

export interface DiagnosticOption {
  id: string;
  text: LText;
  isCorrect?: boolean;
}

export interface DiagnosticQuestion {
  id: string;
  question: LText;
  order: number;
  criterion: Criterion;
  options: DiagnosticOption[];
}

export interface Diagnostic {
  id: string;
  kind: DiagnosticKind;
  title: LText;
  questions?: DiagnosticQuestion[];
  questionCount?: number;
}

export interface AnswerSubmission {
  questionId: string;
  optionId: string;
}

export interface CriterionScore {
  correct: number;
  total: number;
  percent: number;
}
export type ByCriterion = Record<Criterion, CriterionScore | null>;

export interface ResultAnswer {
  questionId: string;
  optionId: string;
  isCorrect: boolean;
  correctOptionId: string;
}

export interface AttemptResult {
  id: string;
  userId: string;
  testId?: string;
  diagnosticId?: string;
  kind?: DiagnosticKind;
  correct: number;
  total: number;
  percent: number;
  level: Level;
  byCriterion: ByCriterion;
  answers: ResultAnswer[];
  createdAt: string;
  test?: Pick<Test, 'id' | 'title'>;
  diagnostic?: Pick<Diagnostic, 'id' | 'title' | 'kind'>;
}
export type TestResult = AttemptResult;
export type DiagnosticResult = AttemptResult;

export interface ResultsSummary {
  tests: TestResult[];
  diagnostics: DiagnosticResult[];
  activities: { total: number; correct: number };
  growth?: { initial: number; final: number; delta: number } | null;
  byCriterion: ByCriterion;
  average: number;
  /** Hali natija yo'q bo'lsa null. */
  level: Level | null;
  progress: {
    periodsViewed: number;
    periodsTotal: number;
    thinkersViewed: number;
    thinkersTotal: number;
    valuesViewed: number;
    valuesTotal: number;
  };
}

export interface TimelineEvent {
  id: string;
  kind: TimelineKind;
  year?: number | null;
  yearLabel?: string | null;
  title: LText;
  description: LText;
  periodId?: string | null;
  refType?: string | null;
  refId?: string | null;
  /** Dissertatsiyadagi havola (bo'lsa). */
  sourceRef?: string | null;
  order: number;
}

export interface ComparisonEntry {
  id: string;
  aspect: LText;
  goldenHorde: LText;
  nogai: LText;
  similarity: LText;
  difference: LText;
  sourceRef?: string | null;
  order: number;
}

export interface LevelThreshold {
  level: Level;
  minPercent: number;
}

export interface StudentRow extends User {
  testsCompleted?: number;
  average?: number | null;
  initialPercent?: number | null;
  finalPercent?: number | null;
  delta?: number | null;
}

export type FeedKind = 'TEST' | 'INITIAL' | 'FINAL' | 'ACTIVITY';
export type FeedFilter = 'TEST' | 'DIAGNOSTIC' | 'ACTIVITY';

/** Ustoz paneli: o'quvchining bitta topshirgan ishi (test, diagnostika yoki topshiriq). */
export interface FeedItem {
  id: string;
  kind: FeedKind;
  student: { id: string; fullName: string; username: string; classLevel: number | null };
  title: LText;
  refId: string;
  correct: number;
  total: number;
  percent: number;
  level: Level | null;
  createdAt: string;
}

export interface ResultsFeed {
  items: FeedItem[];
  totals: { tests: number; diagnostics: number; activities: number };
}

export interface AnalyticsOverview {
  students: number;
  periods: number;
  thinkers: number;
  values: number;
  sources: number;
  tests: number;
  testsCompleted: number;
  averagePercent: number;
  diagnosticAvg: { initial: number | null; final: number | null };
  levelDistribution: Record<Level, number>;
}

export interface ByClassRow {
  classLevel: number | null;
  students: number;
  averagePercent: number | null;
}
export interface ByCriterionRow {
  criterion: Criterion;
  percent: number | null;
}
export interface ByTestRow {
  testId: string;
  title: LText | string;
  attempts: number;
  averagePercent: number;
}
export interface GrowthRow {
  studentId?: string;
  fullName?: string;
  classLevel?: number | null;
  initial: number | null;
  final: number | null;
  delta: number | null;
}
export interface LevelsRow {
  level: Level;
  count: number;
}

export interface AnalyticsFilter {
  classLevel?: number;
  studentId?: string;
  testId?: string;
  criterion?: Criterion;
  kind?: DiagnosticKind;
}

export type ViewEntity = 'PERIOD' | 'THINKER' | 'VALUE' | 'SOURCE';
