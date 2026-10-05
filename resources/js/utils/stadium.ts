const ATTRIBUTE_SHORT_NAMES: Record<string, string> = {
  turf_quality: 'Turf',
  hostility: 'Hostility',
  compactness: 'Compactness',
  mysticism: 'Mysticism',
  shelter: 'Shelter',
  hospitality: 'Hospitality',
};

export const formatAttributeShortName = (key: string): string => {
  return ATTRIBUTE_SHORT_NAMES[key] ?? key;
};
