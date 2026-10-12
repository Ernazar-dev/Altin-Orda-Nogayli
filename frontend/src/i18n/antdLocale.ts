import uzModule from 'antd/locale/uz_UZ';
import type { Locale } from 'antd/es/locale';

// Vite CJS interop ba'zan { default } qaytaradi, shuning uchun ikkala holat ham qo'llab-quvvatlanadi.
const uzUZ: Locale = (uzModule as unknown as { default?: Locale }).default ?? (uzModule as Locale);

/** Ant Design standart matnlari: o'zbek (lotin) tayyor, qoraqalpoq (lotin) uchun asosiy qatorlar qo'lda. */
export const antdUz: Locale = uzUZ;

export const antdKaa: Locale = {
  ...uzUZ,
  locale: 'kaa',
  Pagination: {
    ...uzUZ.Pagination,
    items_per_page: '/ bet',
    jump_to: 'Ótiw',
    jump_to_confirm: 'tastıyıqlaw',
    page: 'Bet',
    prev_page: 'Aldınǵı bet',
    next_page: 'Keyingi bet',
  },
  Form: {
    ...uzUZ.Form,
    optional: '(májbúriy emes)',
    defaultValidateMessages: {
      ...(uzUZ.Form?.defaultValidateMessages ?? {}),
      default: 'Maydandı tekseriwde qátelik: ${label}',
      required: '${label} májbúriy',
    },
  },
  Empty: { description: 'Maǵlıwmat tabılmadı' },
  Table: {
    ...uzUZ.Table,
    emptyText: 'Maǵlıwmat tabılmadı',
    filterReset: 'Tazalaw',
    filterConfirm: 'Maqullaw',
  },
  Select: { notFoundContent: 'Maǵlıwmat tabılmadı' },
  Popconfirm: { okText: 'Awa', cancelText: 'Yaq' },
  Modal: { okText: 'Awa', cancelText: 'Biykar etiw', justOkText: 'Maqullaw' },
};
