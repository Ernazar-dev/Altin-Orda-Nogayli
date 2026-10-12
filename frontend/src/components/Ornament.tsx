import type { CSSProperties } from 'react';
import { BRAND } from '@/brand';
import logoUrl from '@/images/logo.png';
import { ornamentSize, ornamentUrl } from '@/utils/ornament';
import type { OrnamentVariant } from '@/utils/ornament';
import styles from './Ornament.module.scss';

interface BandProps {
  variant?: OrnamentVariant;
  color?: string;
  opacity?: number;
  className?: string;
}

/** Dekorativ gorizontal ornament chizig'i (ekran o'qish vositalaridan yashirin). */
export function OrnamentBand({ variant = 'horn', color = '#8a6414', opacity = 0.55, className }: BandProps) {
  const { w, h } = ornamentSize(variant);
  const style: CSSProperties = {
    height: h,
    backgroundImage: ornamentUrl(variant, color),
    backgroundSize: `${w}px ${h}px`,
    opacity,
  };
  return <div aria-hidden="true" className={`${styles.band} ${className ?? ''}`} style={style} />;
}

/** Sarlavha ostidagi kichik ajratgich: chiziq – motiv – chiziq. */
export function OrnamentDivider({ color = '#8a6414' }: { color?: string }) {
  const { w, h } = ornamentSize('horn');
  return (
    <div aria-hidden="true" className={styles.divider}>
      <span style={{ background: color }} />
      <i style={{ width: w, height: h, backgroundImage: ornamentUrl('horn', color), backgroundSize: `${w}px ${h}px` }} />
      <span style={{ background: color }} />
    </div>
  );
}

/** Tekstura sifatida fon: bloklarning orqasiga joylanadi. */
export function OrnamentTexture({ variant = 'diamond', color = '#8a6414', opacity = 0.08 }: BandProps) {
  const { w, h } = ornamentSize(variant);
  return (
    <div
      aria-hidden="true"
      className={styles.texture}
      style={{ backgroundImage: ornamentUrl(variant, color), backgroundSize: `${w * 1.4}px ${h * 1.4}px`, opacity }}
    />
  );
}

export function LogoMark({ size = 36 }: { size?: number }) {
  return <img src={logoUrl} width={size} height={size} alt={BRAND} style={{ display: 'block' }} />;
}
