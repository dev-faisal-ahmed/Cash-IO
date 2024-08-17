const activeLink: Record<string, string[]> = {
  '/categories': ['/categories', '/add-category'],
};

export const isActive = (url: string, pathName: string) => {
  return activeLink[url]?.includes(pathName);
};
