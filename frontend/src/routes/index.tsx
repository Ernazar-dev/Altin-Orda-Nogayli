import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { PageSkeleton } from '@/components/Async';
import { AuthWallRoute } from '@/components/AuthGate';
import { AppLayout } from '@/layouts/AppLayout';
import { SiteLayout } from '@/layouts/SiteLayout';
import { GuestRoute, ProtectedRoute, RoleRoute } from './guards';

const Home = lazy(() => import('@/pages/public/Home'));
const Guide = lazy(() => import('@/pages/public/Guide'));
const NotFound = lazy(() => import('@/pages/public/NotFound'));
const Login = lazy(() => import('@/pages/auth/Login'));
const Register = lazy(() => import('@/pages/auth/Register'));

const StudentDashboard = lazy(() => import('@/pages/student/Dashboard'));
const Periods = lazy(() => import('@/pages/student/Periods'));
const PeriodDetail = lazy(() => import('@/pages/student/PeriodDetail'));
const Thinkers = lazy(() => import('@/pages/student/Thinkers'));
const ThinkerDetail = lazy(() => import('@/pages/student/ThinkerDetail'));
const Values = lazy(() => import('@/pages/student/Values'));
const ValueDetail = lazy(() => import('@/pages/student/ValueDetail'));
const Sources = lazy(() => import('@/pages/student/Sources'));
const SourceDetail = lazy(() => import('@/pages/student/SourceDetail'));
const TimelinePage = lazy(() => import('@/pages/student/TimelinePage'));
const Compare = lazy(() => import('@/pages/student/Compare'));
const Activities = lazy(() => import('@/pages/student/Activities'));
const ActivityPlay = lazy(() => import('@/pages/student/ActivityPlay'));
const Tests = lazy(() => import('@/pages/student/Tests'));
const TestTake = lazy(() => import('@/pages/student/TestTake'));
const Diagnostics = lazy(() => import('@/pages/student/Diagnostics'));
const DiagnosticTake = lazy(() => import('@/pages/student/DiagnosticTake'));
const Results = lazy(() => import('@/pages/student/Results'));

const TeacherDashboard = lazy(() => import('@/pages/teacher/Dashboard'));
const PeriodsAdmin = lazy(() => import('@/pages/teacher/PeriodsAdmin'));
const ThinkersAdmin = lazy(() => import('@/pages/teacher/ThinkersAdmin'));
const ValuesAdmin = lazy(() => import('@/pages/teacher/ValuesAdmin'));
const SourcesAdmin = lazy(() => import('@/pages/teacher/SourcesAdmin'));
const ActivitiesAdmin = lazy(() => import('@/pages/teacher/ActivitiesAdmin'));
const TestsAdmin = lazy(() => import('@/pages/teacher/TestsAdmin'));
const DiagnosticsAdmin = lazy(() => import('@/pages/teacher/DiagnosticsAdmin'));
const TimelineAdmin = lazy(() => import('@/pages/teacher/TimelineAdmin'));
const ComparisonsAdmin = lazy(() => import('@/pages/teacher/ComparisonsAdmin'));
const TeacherResults = lazy(() => import('@/pages/teacher/Results'));
const StudentsList = lazy(() => import('@/pages/teacher/Students'));
const StudentDetail = lazy(() => import('@/pages/teacher/StudentDetail'));
const Analytics = lazy(() => import('@/pages/teacher/Analytics'));
const Settings = lazy(() => import('@/pages/teacher/Settings'));

export function AppRoutes() {
  return (
    <Suspense fallback={<div className="container" style={{ paddingTop: 96 }}><PageSkeleton /></div>}>
      <Routes>
        {/* To'liq kenglikdagi sahifalar: bosh sahifa, kirish, ro'yxatdan o'tish */}
        <Route element={<SiteLayout bleed />}>
          <Route index element={<Home />} />
          <Route element={<GuestRoute />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
        </Route>

        {/* Hamma uchun bir xil sayt: tepada navbar. Mehmon o'qiy oladi, mashq/baholashni ochish uchun kirish kerak. */}
        <Route element={<SiteLayout />}>
          <Route path="guide" element={<Guide />} />
          <Route path="periods" element={<Periods />} />
          <Route path="periods/:id" element={<PeriodDetail />} />
          <Route path="thinkers" element={<Thinkers />} />
          <Route path="thinkers/:id" element={<ThinkerDetail />} />
          <Route path="values" element={<Values />} />
          <Route path="values/:id" element={<ValueDetail />} />
          <Route path="sources" element={<Sources />} />
          <Route path="sources/:id" element={<SourceDetail />} />
          <Route path="timeline" element={<TimelinePage />} />
          <Route path="compare" element={<Compare />} />
          <Route path="activities" element={<Activities />} />
          <Route path="tests" element={<Tests />} />
          <Route path="diagnostics" element={<Diagnostics />} />

          <Route element={<AuthWallRoute studentOnly />}>
            <Route path="dashboard" element={<StudentDashboard />} />
            <Route path="activities/:id" element={<ActivityPlay />} />
            <Route path="tests/:id" element={<TestTake />} />
            <Route path="diagnostics/:kind" element={<DiagnosticTake />} />
            <Route path="results" element={<Results />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Faqat o'qituvchi: chap yon panelli boshqaruv paneli */}
        <Route element={<ProtectedRoute />}>
          <Route element={<RoleRoute roles={['TEACHER']} />}>
            <Route path="teacher" element={<AppLayout />}>
              <Route index element={<TeacherDashboard />} />
              <Route path="periods" element={<PeriodsAdmin />} />
              <Route path="thinkers" element={<ThinkersAdmin />} />
              <Route path="values" element={<ValuesAdmin />} />
              <Route path="sources" element={<SourcesAdmin />} />
              <Route path="activities" element={<ActivitiesAdmin />} />
              <Route path="tests" element={<TestsAdmin />} />
              <Route path="diagnostics" element={<DiagnosticsAdmin />} />
              <Route path="timeline" element={<TimelineAdmin />} />
              <Route path="comparisons" element={<ComparisonsAdmin />} />
              <Route path="results" element={<TeacherResults />} />
              <Route path="students" element={<StudentsList />} />
              <Route path="students/:id" element={<StudentDetail />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
}
