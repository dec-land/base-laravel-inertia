export const DEFAULT_SORT = '-created_at';

export const nextSortForField = (
  currentSort: string,
  field: string,
  defaultSort: string = DEFAULT_SORT,
) => {
  const activeField = currentSort.startsWith('-') ? currentSort.slice(1) : currentSort;

  if (activeField !== field) {
    return field;
  }

  if (!currentSort.startsWith('-')) {
    return `-${field}`;
  }

  return defaultSort;
};
