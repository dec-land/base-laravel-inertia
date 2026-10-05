import type { ResolvedComponent } from '@inertiajs/react';

type PageModule = {
  default: ResolvedComponent;
};

const clientPages = import.meta.glob<PageModule>('./pages/**/*.tsx');

const pagePath = (name: string): string => `./pages/${name}.tsx`;

export const resolvePage = (name: string): Promise<ResolvedComponent> => {
  const page = clientPages[pagePath(name)];

  if (!page) {
    return Promise.reject(new Error(`Unknown Inertia page: ${name}`));
  }

  return page().then((module) => module.default);
};
