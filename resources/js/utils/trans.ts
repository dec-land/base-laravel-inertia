import enLocale from '@/locales/en.json' with { type: 'json' };

export type TranslationParams = Record<string, string | number>;

const getNestedValue = (obj: Record<string, unknown>, path: string[]): string | undefined => {
  const [head, ...tail] = path;
  if (!head || obj[head] === undefined) {
    return undefined;
  }

  const value = obj[head];
  if (tail.length === 0) {
    return typeof value === 'string' ? value : undefined;
  }

  if (typeof value === 'object' && value !== null) {
    return getNestedValue(value as Record<string, unknown>, tail);
  }

  return undefined;
};

const interpolate = (template: string, params?: TranslationParams): string => {
  if (!params) {
    return template;
  }

  return Object.entries(params).reduce<string>((acc, [paramKey, paramValue]) => {
    return acc
      .replaceAll(`{${paramKey}}`, String(paramValue))
      .replaceAll(`:${paramKey}`, String(paramValue));
  }, template);
};

type NestedKeyOf<T> = T extends object
  ? {
      [K in keyof T & (string | number)]: T[K] extends object
        ? `${K}.${NestedKeyOf<T[K]>}`
        : `${K}`;
    }[keyof T & (string | number)]
  : never;

export type TranslationKey = NestedKeyOf<typeof enLocale>;

export type TranslateFn = (key: TranslationKey, params?: TranslationParams) => string;

export const trans: TranslateFn = (key: TranslationKey, params?: TranslationParams): string => {
  const path = (key as string).split('.');
  const template = getNestedValue(enLocale as Record<string, unknown>, path);

  if (template === undefined) {
    return key;
  }

  return interpolate(template, params);
};

export const t = trans;
