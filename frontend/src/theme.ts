import type { ThemeConfig } from 'antd';
export const theme: ThemeConfig = {
  token: {
    blue: '#2e6150', colorPrimary: '#2e6150', colorInfo: '#2e6150', colorSuccess: '#286646', colorError: '#a8322d', colorWarning: '#805c22', colorLink: '#2e6150',
    colorBgBase: '#ffffff', colorBgLayout: '#f7f8f3', colorTextBase: '#303c34', colorBorder: '#d9dfd2', colorBorderSecondary: '#e3e6dc',
    borderRadius: 7, fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif", fontSize: 14, controlHeight: 42,
  },
  components: {
    Button: { primaryShadow: 'none', fontWeight: 500, controlHeightLG: 46, paddingInlineLG: 22 },
    Card: { borderRadiusLG: 10 },
    Menu: { itemBorderRadius: 6, itemSelectedBg: '#e8eee4', itemSelectedColor: '#2e6150' },
    Layout: { siderBg: '#ffffff', headerBg: '#ffffff' },
    Tabs: { itemSelectedColor: '#2e6150', inkBarColor: '#2e6150' },
    Table: { headerBg: '#f2f4ed', headerColor: '#43533e', cellPaddingBlock: 16 },
    Modal: { borderRadiusLG: 12 },
    Segmented: { itemSelectedBg: '#ffffff', itemSelectedColor: '#2e6150' },
  },
};
