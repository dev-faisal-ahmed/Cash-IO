const removeEmptyProperties = (args: Record<string, any>) => {
  return Object.keys(args).reduce((obj: Record<string, any>, key) => {
    if (args[key]) obj[key] = args[key];
    return obj;
  }, {});
};

export const makeSearchQuery = (args: Record<string, any>) => {
  const validArgs = removeEmptyProperties(args);
  return Object.keys(validArgs).reduce((url: string, key, index) => {
    if (index === 0) url += `?${key}=${args[key]}`;
    else url += `&${key}=${args[key]}`;
    return url;
  }, '');
};
