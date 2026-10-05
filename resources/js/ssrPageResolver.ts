import type { ResolvedComponent } from '@inertiajs/react';

type PageModule = {
  default: ResolvedComponent;
};

const serverPages = import.meta.glob<PageModule>('./pages/**/*.tsx', { eager: true });

const pagePath = (name: string): string => `./pages/${name}.tsx`;

export const resolveSsrPage = (name: string): ResolvedComponent => {
  const page = serverPages[pagePath(name)];

  if (!page) {
    throw new Error(`Unknown Inertia page: ${name}`);
  }

  return page.default;
};
