import { useParams } from 'react-router-dom';
import { Tag } from 'antd';
import { useI18n } from '@/i18n';
import { resultsApi, studentsApi } from '@/api/resources';
import { useAsync } from '@/hooks/useAsync';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { Async } from '@/components/Async';
import { BackLink } from '@/components/BackLink';
import { PageHeader } from '@/components/PageHeader';
import { ResultsDashboard } from '@/components/ResultsDashboard';

export default function StudentDetail() {
  const { id = '' } = useParams();
  const { t } = useI18n();
  const student = useAsync(() => studentsApi.get(id), [id]);
  const results = useAsync(() => resultsApi.ofStudent(id), [id]);
  useDocumentTitle(student.data?.fullName ?? t('students.title'));

  return (
    <Async state={student}>
      {(s) => (
        <>
          <PageHeader
            back={<BackLink to="/teacher/students" label={t('students.title')} />}
            eyebrow={t('students.title')}
            title={s.fullName}
            lead={`${t('auth.username')}: ${s.username}`}
            actions={<Tag variant="filled" style={{ fontSize: 14, padding: '4px 12px' }}>{t('students.class')}: {s.classLevel ?? '–'}</Tag>}
          />
          <Async state={results}>{(r) => <ResultsDashboard data={r} />}</Async>
        </>
      )}
    </Async>
  );
}
