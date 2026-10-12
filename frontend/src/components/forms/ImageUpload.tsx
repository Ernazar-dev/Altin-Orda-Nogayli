import { useState } from 'react';
import { App, Button, Upload } from 'antd';
import type { RcFile } from 'antd/es/upload';
import { UploadOutlined } from '@ant-design/icons';
import { useI18n } from '@/i18n';
import { uploadApi } from '@/api/resources';
import { assetUrl, errorMessage } from '@/api/client';
import styles from './forms.module.scss';

const ALLOWED = ['image/jpeg', 'image/png', 'image/webp'];
const MAX = 5 * 1024 * 1024;

interface Props {
  value?: string | null;
  onChange?: (url: string | null) => void;
}

/** Ixtiyoriy rasm: jpg/jpeg/png/webp, 5 MB gacha. Yuklanmasa matnli layout ishlatiladi. */
export function ImageUpload({ value, onChange }: Props) {
  const { t } = useI18n();
  const { message } = App.useApp();
  const [busy, setBusy] = useState(false);

  async function upload(file: RcFile) {
    if (!ALLOWED.includes(file.type) || file.size > MAX) {
      void message.error(t('common.imageHint'));
      return;
    }
    setBusy(true);
    try {
      onChange?.(await uploadApi.image(file));
      void message.success(t('crud.imageUploaded'));
    } catch (e) {
      void message.error(errorMessage(e, t('crud.imageFailed')));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className={styles.upload}>
      {value && <img src={assetUrl(value)} alt="" />}
      <div>
        <Upload
          accept=".jpg,.jpeg,.png,.webp"
          showUploadList={false}
          beforeUpload={(f) => {
            void upload(f);
            return false;
          }}
        >
          <Button icon={<UploadOutlined />} loading={busy}>
            {t('common.upload')}
          </Button>
        </Upload>
        {value && (
          <Button type="link" danger onClick={() => onChange?.(null)}>
            {t('common.delete')}
          </Button>
        )}
        <small>{t('common.imageHint')}</small>
      </div>
    </div>
  );
}
