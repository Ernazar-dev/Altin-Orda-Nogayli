import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Button, Drawer, Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import { BookOutlined, BulbOutlined, ClusterOutlined, DashboardOutlined, DiffOutlined, DownOutlined, ExperimentOutlined, FieldTimeOutlined, FormOutlined, SafetyCertificateOutlined, HomeOutlined, LineChartOutlined, LoginOutlined, LogoutOutlined, MenuOutlined, ReadOutlined, UserAddOutlined, UserOutlined } from '@ant-design/icons';
import { useI18n } from '@/i18n';
import { useAuth } from '@/context/AuthContext';
import { LangSwitch } from '@/components/LangSwitch';
import { LogoMark } from '@/components/Ornament';
import styles from './SiteLayout.module.scss';

const GROUPS = [
  { title: 'nav.learn', items: [
    { to: '/periods', label: 'nav.periods', icon: <ClusterOutlined /> },
    { to: '/thinkers', label: 'nav.thinkers', icon: <UserOutlined /> },
    { to: '/sources', label: 'nav.sources', icon: <BookOutlined /> },
    { to: '/values', label: 'nav.values', icon: <SafetyCertificateOutlined /> },
    { to: '/timeline', label: 'nav.timeline', icon: <FieldTimeOutlined /> },
    { to: '/compare', label: 'nav.compare', icon: <DiffOutlined /> },
  ] },
  { title: 'nav.practice', items: [
    { to: '/activities', label: 'nav.activities', icon: <BulbOutlined /> },
    { to: '/tests', label: 'nav.tests', icon: <FormOutlined /> },
    { to: '/diagnostics', label: 'nav.diagnostics', icon: <ExperimentOutlined /> },
    { to: '/results', label: 'nav.results', icon: <LineChartOutlined /> },
  ] },
] as const;

export function SiteLayout({ bleed = false }: { bleed?: boolean }) {
  const { t } = useI18n();
  const { user, logout } = useAuth();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [drawer, setDrawer] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const cabinet = user?.role === 'TEACHER' ? '/teacher' : '/dashboard';
  const isHome = pathname === '/';
  const isAuth = pathname === '/login' || pathname === '/register';
  useEffect(() => { window.scrollTo(0, 0); setDrawer(false); setOpenGroup(null); }, [pathname]);
  const brand = <Link to="/" className={styles.brand}><LogoMark size={40} /><span className={styles.brandText}><strong>{t('app.name')}</strong><small>{t('study.platform')}</small></span></Link>;
  const navClass = ({ isActive }: { isActive: boolean }) => `${styles.navLink} ${isActive ? styles.active : ''}`;
  const inGroup = (group: typeof GROUPS[number]) => group.items.some(item => pathname === item.to || pathname.startsWith(`${item.to}/`));
  const accountMenu: MenuProps = user
    ? {
      items: [
        { key: 'name', label: user.fullName, disabled: true },
        { type: 'divider' },
        { key: 'cab', label: user.role === 'TEACHER' ? t('nav.dashboard') : t('nav.myPage'), icon: <UserOutlined /> },
        { key: 'out', label: t('auth.logout'), icon: <LogoutOutlined /> },
      ],
      onClick: ({ key }) => { if (key === 'cab') navigate(cabinet); else { logout(); navigate('/'); } },
    }
    : {
      items: [
        { key: '/login', label: t('auth.login'), icon: <LoginOutlined /> },
        { key: '/register', label: t('auth.register'), icon: <UserAddOutlined /> },
      ],
      onClick: ({ key }) => navigate(key),
    };
  return <div className={styles.shell}>
    <a className="skip-link" href="#main">{t('app.skip')}</a>
    <header className={styles.header}>
      <div className={styles.bar}>
        {brand}
        <nav className={styles.desktopNav} aria-label={t('nav.menu')}>
          <NavLink to="/" end className={navClass}>{t('nav.home')}</NavLink>
          {GROUPS.map(group => <Dropdown key={group.title} trigger={['click']} open={openGroup === group.title} onOpenChange={open => setOpenGroup(open ? group.title : null)} menu={{ selectedKeys: group.items.filter(item => pathname === item.to || pathname.startsWith(`${item.to}/`)).map(item => item.to), items: group.items.map(item => ({ key: item.to, icon: item.icon, label: <Link to={item.to}>{t(item.label)}</Link> })), onClick: () => setOpenGroup(null) }}>
            <button type="button" className={`${styles.navLink} ${inGroup(group) ? styles.active : ''}`} aria-expanded={openGroup === group.title} aria-haspopup="menu">{t(group.title)}<DownOutlined /></button>
          </Dropdown>)}
          <NavLink to="/sources" className={navClass}>{t('nav.sources')}</NavLink>
          <NavLink to="/guide" className={navClass}>{t('study.guide')}</NavLink>
        </nav>
        <div className={styles.actions}>
          <LangSwitch size="small" />
          <Dropdown trigger={['click']} placement="bottomRight" menu={accountMenu}>
            <button type="button" className={`${styles.account} ${user ? styles.accountIn : ''}`} aria-label={user ? user.fullName : t('auth.login')} aria-haspopup="menu">
              {user ? user.fullName.trim().charAt(0).toUpperCase() : <UserOutlined />}
            </button>
          </Dropdown>
          <Button className={styles.burger} type="text" icon={<MenuOutlined />} aria-label={t('nav.openMenu')} aria-expanded={drawer} onClick={() => setDrawer(true)} />
        </div>
      </div>
    </header>
    <main id="main" tabIndex={-1} className={`${styles.main} ${isHome ? styles.landing : ''} ${isAuth ? styles.authPage : ''}`} data-bleed={bleed}><Outlet /></main>
    {!isAuth && <footer className={styles.footer}>
      <div className={styles.footerMain}>
        <div className={styles.footerBrand}>{brand}<p>{t('app.tagline')}</p><span className={styles.audience}>{t('home.audience')}</span></div>
        <nav aria-label={t('nav.learn')}><h2>{t('nav.learn')}</h2>{GROUPS[0].items.map(item => <Link key={item.to} to={item.to}>{t(item.label)}</Link>)}</nav>
        <nav aria-label={t('nav.practice')}><h2>{t('nav.practice')}</h2>{GROUPS[1].items.map(item => <Link key={item.to} to={item.to}>{t(item.label)}</Link>)}<Link to="/guide">{t('study.guide')}</Link></nav>
      </div>
      <div className={styles.footerBase}>
        <span>© {new Date().getFullYear()} {t('app.name')}</span>
        <span className={styles.footerNote}>{t('study.sourceBased')} · {t('study.platform')}</span>
        <Link to={user ? cabinet : '/login'}>{user ? t('nav.myPage') : t('auth.login')} →</Link>
      </div>
    </footer>}
    <Drawer open={drawer} onClose={() => setDrawer(false)} placement="right" size="min(92vw, 360px)" title={brand}>
      <nav aria-label={t('nav.menu')} className={styles.mobileNav}>
        <NavLink to="/" end className={navClass} onClick={() => setDrawer(false)}><HomeOutlined />{t('nav.home')}</NavLink>
        {user && <NavLink to={cabinet} className={navClass}><DashboardOutlined />{user.role === 'TEACHER' ? t('nav.dashboard') : t('nav.myPage')}</NavLink>}
        {GROUPS.map(group => <div key={group.title} className={styles.group}><p>{t(group.title)}</p>{group.items.map(item => <NavLink key={item.to} to={item.to} className={navClass} onClick={() => setDrawer(false)}>{item.icon}{t(item.label)}</NavLink>)}</div>)}
        <div className={styles.group}><NavLink to="/guide" className={navClass}><ReadOutlined />{t('study.guide')}</NavLink></div>
        {!user && <div className={styles.mobileAuth}><Link to="/login">{t('auth.login')} →</Link><Link className={styles.join} to="/register">{t('auth.register')}</Link></div>}
      </nav>
    </Drawer>
  </div>;
}
