// Original SVG ornamentlar (qoshqar muyiz va "o'siq" motivlari). CSS background sifatida ishlatiladi.
export type OrnamentVariant = 'horn' | 'sprout' | 'diamond';

const PATHS: Record<OrnamentVariant, { w: number; h: number; body: string }> = {
  horn: {
    w: 56,
    h: 28,
    body: `<path d='M28 14C28 6 20 3 14 6C8 9 8 18 14 19C19 20 21 14 17 12M28 14C28 6 36 3 42 6C48 9 48 18 42 19C37 20 35 14 39 12M28 14V25' />
<circle cx='28' cy='26' r='1.4' fill='COLOR' stroke='none'/>`,
  },
  sprout: {
    w: 40,
    h: 40,
    body: `<path d='M20 34V14M20 22C14 22 11 18 11 13M20 22C26 22 29 18 29 13M20 14L16 9L20 4L24 9Z' />
<circle cx='11' cy='13' r='1.3' fill='COLOR' stroke='none'/><circle cx='29' cy='13' r='1.3' fill='COLOR' stroke='none'/>`,
  },
  diamond: {
    w: 32,
    h: 32,
    body: `<path d='M16 3L29 16L16 29L3 16Z M16 10L22 16L16 22L10 16Z' />`,
  },
};

export function ornamentUrl(variant: OrnamentVariant, color = '#8a6414', stroke = 1.4): string {
  const { w, h, body } = PATHS[variant];
  const c = color.replace('#', '%23');
  const svg =
    `<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}' viewBox='0 0 ${w} ${h}' ` +
    `fill='none' stroke='${c}' stroke-width='${stroke}' stroke-linecap='round' stroke-linejoin='round'>` +
    body.replace(/COLOR/g, c).replace(/\n/g, '') +
    `</svg>`;
  return `url("data:image/svg+xml,${svg.replace(/"/g, "'").replace(/</g, '%3C').replace(/>/g, '%3E').replace(/#/g, '%23')}")`;
}

export function ornamentSize(variant: OrnamentVariant): { w: number; h: number } {
  const { w, h } = PATHS[variant];
  return { w, h };
}
