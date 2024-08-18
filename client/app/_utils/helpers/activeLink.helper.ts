const activeLink: Record<string, string[]> = {
  ['/']: ['/'],
  ['/categories']: ['/categories', '/category/add', '/category/update'],
  ['/wallets']: ['/wallets', '/wallet/add', '/wallet/update'],
};

export const isActive = (url: string, pathName: string) => {
  return activeLink[url]?.includes(pathName);
};
