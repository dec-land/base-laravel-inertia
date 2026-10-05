export const DARK_THEMES = [
  'black',
  'dim',
  'dracula',
  'halloween',
  'forest',
  'luxury',
  'synthwave',
  'business',
  'night',
  'coffee',
] as const;

export const LIGHT_THEMES = [
  'light',
  'cupcake',
  'emerald',
  'corporate',
  'retro',
  'cyberpunk',
  'valentine',
] as const;

/**
 * Calculates WCAG relative luminance of a hex color.
 */
export function getLuminance(hex: string): number {
  const cleanHex = hex.replace('#', '').trim();
  if (cleanHex.length !== 3 && cleanHex.length !== 6) {
    return 0.5;
  }

  const fullHex =
    cleanHex.length === 3
      ? cleanHex
          .split('')
          .map((c) => c + c)
          .join('')
      : cleanHex;

  const r = parseInt(fullHex.substring(0, 2), 16) / 255;
  const g = parseInt(fullHex.substring(2, 4), 16) / 255;
  const b = parseInt(fullHex.substring(4, 6), 16) / 255;

  const toLinear = (c: number): number => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);

  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
}

/**
 * Determines whether the current document theme or passed theme name is dark.
 */
export function isCurrentThemeDark(themeName?: string): boolean {
  const theme =
    themeName ||
    (typeof document !== 'undefined'
      ? document.documentElement.getAttribute('data-theme')
      : null) ||
    'black';

  if (LIGHT_THEMES.includes(theme as (typeof LIGHT_THEMES)[number])) {
    return false;
  }

  return true;
}

/**
 * Returns an accessible text color for a team.
 * If the primary color has poor contrast against the theme (e.g. white on light theme,
 * or dark black on dark theme), it falls back to secondaryColor if contrasting,
 * or undefined so the text inherits DaisyUI's high-contrast `text-base-content`.
 */
export function getTeamTextColor(
  primaryColor?: string | null,
  secondaryColor?: string | null,
  isDark?: boolean,
): string | undefined {
  if (!primaryColor) {
    return undefined;
  }

  const dark = isDark !== undefined ? isDark : isCurrentThemeDark();
  const primaryLum = getLuminance(primaryColor);

  // On light theme: if primary color is too bright (e.g. white/light grey), it will wash out on light cards
  if (!dark && primaryLum > 0.55) {
    if (secondaryColor && getLuminance(secondaryColor) < 0.45) {
      return secondaryColor;
    }
    return undefined;
  }

  // On dark theme: if primary color is too dark (e.g. pure black), it will wash out on dark backgrounds
  if (dark && primaryLum < 0.15) {
    if (secondaryColor && getLuminance(secondaryColor) > 0.55) {
      return secondaryColor;
    }
    return undefined;
  }

  return primaryColor;
}
