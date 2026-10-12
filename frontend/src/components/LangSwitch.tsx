import { Segmented } from 'antd';
import { useI18n } from '@/i18n';
import type { Lang } from '@/types';

export function LangSwitch({ size = 'middle' }: { size?: 'small' | 'middle' }) {
  const { lang, setLang, t } = useI18n();
  return (
    <Segmented<Lang>
      size={size}
      aria-label={t('lang.label')}
      value={lang}
      onChange={setLang}
      options={[
        { label: 'UZ', value: 'uz', title: t('lang.uz') },
        { label: 'QQ', value: 'kaa', title: t('lang.kaa') },
      ]}
    />
  );
}
