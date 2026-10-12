import { useEffect, useState } from 'react';
import type { CSSProperties } from 'react';
import { useI18n } from '@/i18n';
import { STEPPE_MAP as M } from '@/data/steppeMap';
import styles from './MapScene.module.scss';

type Era = 'horde' | 'nogai';
type CityKind = 'capital' | 'town' | 'muted';
type CityKey = keyof typeof M.cities;

const ERAS: Era[] = ['horde', 'nogai'];
const YEARS: Record<Era, string> = { horde: '1330', nogai: '1550' };
const CYCLE_MS = 7000;

/** Oltin O'rda va No'g'oy yurti xaritasi: hududlar ochiladi, chegara chiziladi, davrlar o'zaro almashadi. */
export function MapScene() {
  const { t } = useI18n();
  const [era, setEra] = useState<Era>('horde');
  const [auto, setAuto] = useState(true);
  const [w, h] = M.viewBox;
  const [cx, cy] = M.cities.saray;

  useEffect(() => {
    if (!auto || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = window.setInterval(() => setEra((e) => (e === 'horde' ? 'nogai' : 'horde')), CYCLE_MS);
    return () => window.clearInterval(id);
  }, [auto]);

  const pick = (next: Era) => { setAuto(false); setEra(next); };
  const city = (key: CityKey, label: string, visible: boolean, kind: CityKind = 'town') => {
    const [x, y] = M.cities[key];
    return (
      <g key={key} className={`${styles.city} ${styles[kind]} ${visible ? styles.on : ''}`}>
        {kind === 'capital' && visible && <circle className={styles.pulse} cx={x} cy={y} r="3" />}
        <circle className={styles.mark} cx={x} cy={y} r={kind === 'capital' ? 3.8 : 2.4} />
        <text x={x + 7} y={y + 3.5}>{label}</text>
      </g>
    );
  };

  return (
    <div className={styles.wrap} onPointerEnter={() => setAuto(false)}>
      <svg className={styles.map} style={{ '--ratio': w / h } as CSSProperties} viewBox={`0 0 ${w} ${h}`} role="img" aria-label={t('map.label')}>
        <defs>
          <clipPath id="msLand"><path d={M.land} /></clipPath>
          <clipPath id="msReveal"><circle className={styles.revealCircle} cx={cx} cy={cy} r="720" /></clipPath>
          <radialGradient id="msFade" cx="50%" cy="50%" r="50%">
            <stop offset="76%" stopColor="#fff" />
            <stop offset="100%" stopColor="#000" />
          </radialGradient>
          <mask id="msMask"><rect width={w} height={h} fill="url(#msFade)" /></mask>
          <pattern id="msHatchGold" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="5" stroke="#f1dfaa" strokeWidth="1.1" /></pattern>
          <pattern id="msHatchRust" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(-45)"><line x1="0" y1="0" x2="0" y2="5" stroke="#ffae85" strokeWidth="1.1" /></pattern>
          <marker id="msArrow" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L10 5L0 10z" fill="#ffae85" /></marker>
          <path id="msVolga" d={M.rivers.volga} />
          <path id="msYaik" d={M.rivers.yaik} />
          
        </defs>

        <g mask="url(#msMask)">
          <rect width={w} height={h} className={styles.sea} />
          <path d={M.land} className={styles.land} />
          <path d={M.graticule} className={styles.graticule} />
          <path d={M.aral} className={styles.sea} />

          <g className={styles.rivers}>
            {Object.entries(M.rivers).map(([k, d]) => <path key={k} d={d} />)}
          </g>

          <g clipPath="url(#msLand)">
            <g clipPath="url(#msReveal)">
              <g className={`${styles.zone} ${era === 'horde' ? styles.hot : ''}`}>
                <path d={M.horde} className={styles.hordeFill} />
                <path d={M.horde} fill="url(#msHatchGold)" className={styles.hatch} />
              </g>
              <g className={`${styles.zone} ${era === 'nogai' ? styles.hot : ''}`}>
                <path d={M.nogai} className={styles.nogaiFill} />
                <path d={M.littleNogai} className={styles.nogaiFill} />
                <path d={M.nogai} fill="url(#msHatchRust)" className={styles.hatch} />
                <path d={M.littleNogai} fill="url(#msHatchRust)" className={styles.hatch} />
              </g>
              {era === 'horde' && <path key="h" d={M.horde} pathLength={1} className={`${styles.outline} ${styles.hordeLine}`} />}
              {era === 'nogai' && <path key="n" d={M.nogai} pathLength={1} className={`${styles.outline} ${styles.nogaiLine}`} />}
              {era === 'nogai' && <path key="l" d={M.littleNogai} pathLength={1} className={`${styles.outline} ${styles.nogaiLine}`} />}
            </g>
          </g>

          <g className={styles.water}>
            <text x={M.labels.black[0]} y={M.labels.black[1]} textAnchor="middle">{t('map.black')}</text>
            <text x={M.labels.caspian[0]} y={M.labels.caspian[1]} textAnchor="middle">{t('map.caspian')}</text>
            <text x={M.labels.aral[0]} y={M.labels.aral[1]} textAnchor="middle" className={styles.small}>{t('map.aral')}</text>
            <text className={styles.river}><textPath href="#msVolga" startOffset="46%">{t('map.volga')}</textPath></text>
            <text className={styles.river}><textPath href="#msYaik" startOffset="30%">{t('map.yaik')}</textPath></text>
          </g>

          <g className={styles.regions}>
            <text className={`${styles.region} ${styles.hordeText} ${era === 'horde' ? styles.on : ''}`} x={M.labels.horde[0]} y={M.labels.horde[1]} textAnchor="middle">{t('crud.goldenHorde').toUpperCase()}</text>
            <text className={`${styles.region} ${styles.nogaiText} ${era === 'nogai' ? styles.on : ''}`} x={M.labels.nogai[0]} y={M.labels.nogai[1]} textAnchor="middle">{t('crud.nogai').toUpperCase()}</text>
          </g>

          {era === 'nogai' && (
            <g key="flow" className={styles.flowGroup}>
              <path d={M.flow} className={styles.flow} markerEnd="url(#msArrow)" />
            </g>
          )}

          {city('moscow', t('map.moscow'), true, 'muted')}
          {city('kazan', t('map.kazan'), true, 'muted')}
          {city('bolghar', t('map.bolghar'), era === 'horde')}
          {city('urgench', t('map.urgench'), true)}
          {city('qrim', t('map.qrim'), era === 'horde')}
          {city('astrakhan', t('map.astrakhan'), era === 'nogai')}
          {city('saray', t('map.saray'), era === 'horde', 'capital')}
          {city('saraishyq', t('map.saraishyq'), era === 'nogai', 'capital')}
        </g>
        {ERAS.map((id) => <text key={id} x="14" y="54" className={`${styles.year} ${era === id ? styles.on : ''}`}>{YEARS[id]}</text>)}
      </svg>

      <div className={styles.controls} role="group" aria-label={t('map.label')}>
        {ERAS.map((id) => (
          <button key={id} type="button" className={`${styles.era} ${era === id ? styles.active : ''}`} aria-pressed={era === id} onClick={() => pick(id)}>
            <strong>{t(id === 'horde' ? 'crud.goldenHorde' : 'crud.nogai')}</strong>
            <small>{t(id === 'horde' ? 'map.hordeYears' : 'map.nogaiYears')}</small>
          </button>
        ))}
        <span className={styles.track} aria-hidden="true"><i className={`${styles.marker} ${era === 'nogai' ? styles.right : ''}`} /></span>
      </div>
      <p className={styles.caption} aria-live="polite">{t(era === 'horde' ? 'map.hordeNote' : 'map.nogaiNote')} <span>{t('map.approx')}</span></p>
    </div>
  );
}
