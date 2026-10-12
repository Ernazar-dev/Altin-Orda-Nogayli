import { useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Button, Drawer, Dropdown, Layout, Menu } from 'antd';
import type { MenuProps } from 'antd';
import {
  BarChartOutlined,
  BookOutlined,
  ClusterOutlined,
  DashboardOutlined,
  DiffOutlined,
  EditOutlined,
  ExperimentOutlined,
  FieldTimeOutlined,
  FileDoneOutlined,
  FileTextOutlined,
  FolderOpenOutlined,
  FundOutlined,
  GlobalOutlined,
  ReadOutlined,
  SafetyCertificateOutlined,
  LogoutOutlined,
  MenuOutlined,
  SettingOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useI18n } from '@/i18n';
import type { I18nKey } from '@/i18n';
import { useAuth } from '@/context/AuthContext';
import { LangSwitch } from '@/components/LangSwitch';
import { LogoMark, OrnamentBand } from '@/components/Ornament';
import { PageEnter } from '@/components/Motion';
import styles from './AppLayout.module.scss';

interface Item {
  key: string;
  label: I18nKey;
  icon: ReactNode;
}
interface Group {
  title?: I18nKey;
  icon?: ReactNode;
  items: Item[];
}

/** Chap yon panel faqat boshqaruv paneli (o'qituvchi) uchun. */
const TEACHER_MENU: Group[] = [
  { items: [{ key: '/teacher', label: 'nav.dashboard', icon: <DashboardOutlined /> }] },
  {
    title: 'nav.control',
    icon: <FundOutlined />,
    items: [
      { key: '/teacher/results', label: 'nav.results', icon: <FileDoneOutlined /> },
      { key: '/teacher/students', label: 'nav.students', icon: <TeamOutlined /> },
      { key: '/teacher/analytics', label: 'nav.analytics', icon: <BarChartOutlined /> },
    ],
  },
  {
    title: 'nav.manage',
    icon: <FolderOpenOutlined />,
    items: [
      { key: '/teacher/periods', label: 'nav.periods', icon: <ClusterOutlined /> },
      { key: '/teacher/thinkers', label: 'nav.thinkers', icon: <UserOutlined /> },
      { key: '/teacher/values', label: 'nav.values', icon: <SafetyCertificateOutlined /> },
      { key: '/teacher/sources', label: 'nav.sources', icon: <BookOutlined /> },
      { key: '/teacher/timeline', label: 'nav.timeline', icon: <FieldTimeOutlined /> },
      { key: '/teacher/comparisons', label: 'nav.comparisons', icon: <DiffOutlined /> },
    ],
  },
  {
    title: 'nav.practice',
    icon: <ReadOutlined />,
    items: [
      { key: '/teacher/activities', label: 'nav.activities', icon: <EditOutlined /> },
      { key: '/teacher/tests', label: 'nav.tests', icon: <FileTextOutlined /> },
      { key: '/teacher/diagnostics', label: 'nav.diagnostics', icon: <ExperimentOutlined /> },
    ],
  },
  { items: [{ key: '/teacher/settings', label: 'nav.settings', icon: <SettingOutlined /> }] },
];

function selectedKey(pathname: string, groups: Group[]): string[] {
  const keys = groups.flatMap((g) => g.items.map((i) => i.key));
  const match = keys
    .filter((k) => pathname === k || pathname.startsWith(`${k}/`))
    .sort((a, b) => b.length - a.length)[0];
  return match ? [match] : [];
}

/** Guruh (ochiladigan bo'lim) kaliti: shu guruhdagi sahifa ochiq bo'lsa, guruh o'zi ham ochiladi. */
function activeGroupKey(pathname: string, groups: Group[]): string | null {
  const sel = selectedKey(pathname, groups)[0];
  const gi = groups.findIndex((g) => g.title && g.items.some((i) => i.key === sel));
  return gi >= 0 ? `g${gi}` : null;
}

function SideMenu({ groups, onNavigate }: { groups: Group[]; onNavigate?: () => void }) {
  const { t } = useI18n();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const active = activeGroupKey(pathname, groups);
  const [openKeys, setOpenKeys] = useState<string[]>(active ? [active] : []);
  useEffect(() => {
    if (active) setOpenKeys((keys) => (keys.includes(active) ? keys : [...keys, active]));
  }, [active]);
  type MenuItem = NonNullable<MenuProps['items']>[number];
  const items: MenuItem[] = groups.flatMap<MenuItem>((g, gi) => {
    const entries = g.items.map((i) => ({ key: i.key, icon: i.icon, label: t(i.label) }));
    return g.title ? [{ key: `g${gi}`, icon: g.icon, label: t(g.title), children: entries }] : entries;
  });
  return (
    <Menu
      mode="inline"
      theme="dark"
      className={styles.menu}
      selectedKeys={selectedKey(pathname, groups)}
      openKeys={openKeys}
      onOpenChange={setOpenKeys}
      items={items}
      onClick={({ key }) => {
        navigate(key);
        onNavigate?.();
      }}
    />
  );
}

export function AppLayout() {
  const { t } = useI18n();
  const { user, logout } = useAuth();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const brand = useMemo(
    () => (
      <Link to="/teacher" className={styles.brand}>
        <LogoMark size={34} />
        <span>{t('app.name')}</span>
      </Link>
    ),
    [t],
  );

  return (
    <Layout className={styles.layout}>
      <a className="skip-link" href="#main">
        {t('app.skip')}
      </a>
      <Layout.Sider className={styles.sider} width={250} breakpoint="lg" collapsedWidth={0} trigger={null}>
        <div className={styles.siderInner}>
          <div className={styles.siderHead}>{brand}</div>
          <nav aria-label={t('nav.menu')}>
            <SideMenu groups={TEACHER_MENU} />
          </nav>
          <OrnamentBand variant="horn" color="#e0a526" opacity={0.4} className={styles.siderOrn} />
        </div>
      </Layout.Sider>
      <Layout className={styles.content}>
        <Layout.Header className={styles.header}>
          <span className={styles.headerTitle}>{t(TEACHER_MENU.flatMap((g) => g.items).find((i) => i.key === selectedKey(pathname, TEACHER_MENU)[0])?.label ?? 'nav.dashboard')}</span>
          <Button
            className={styles.burger}
            type="text"
            icon={<MenuOutlined />}
            aria-label={t('nav.menu')}
            onClick={() => setOpen(true)}
          />
          <span className={styles.mobileBrand}>{brand}</span>
          <div className={styles.headerRight}>
            <Link to="/" className={styles.siteLink}>
              <Button type="text" icon={<GlobalOutlined />}>
                <span className={styles.siteLabel}>{t('nav.siteView')}</span>
              </Button>
            </Link>
            <LangSwitch size="small" />
            <Dropdown
              trigger={['click']}
              menu={{
                items: [
                  { key: 'role', label: t(`role.${user?.role ?? 'TEACHER'}` as const), disabled: true },
                  { key: 'out', icon: <LogoutOutlined />, label: t('auth.logout') },
                ],
                onClick: ({ key }) => {
                  if (key === 'out') {
                    logout();
                    navigate('/');
                  }
                },
              }}
            >
              <Button type="text" icon={<UserOutlined />} className={styles.user}>
                <span className={styles.userName}>{user?.fullName}</span>
              </Button>
            </Dropdown>
          </div>
        </Layout.Header>
        <Layout.Content id="main" role="main" tabIndex={-1} className={styles.main}>
          <PageEnter key={pathname}>
            <Outlet />
          </PageEnter>
        </Layout.Content>
      </Layout>
      <Drawer
        placement="left"
        open={open}
        onClose={() => setOpen(false)}
        size={300}
        title={brand}
        styles={{ body: { padding: 0, background: '#173d32' }, header: { background: '#173d32', borderBottom: '1px solid #ffffff1f' } }}
        closeIcon
        className={styles.drawer}
      >
        <nav aria-label={t('nav.menu')}>
          <SideMenu groups={TEACHER_MENU} onNavigate={() => setOpen(false)} />
        </nav>
      </Drawer>
    </Layout>
  );
}
