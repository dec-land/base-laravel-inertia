import { createInertiaApp } from '@inertiajs/react';
import createServer from '@inertiajs/react/server';
import { renderToString } from 'react-dom/server';
import { resolveSsrPage } from '@/ssrPageResolver';

const appName = 'Fubball';

createServer((page) =>
  createInertiaApp({
    page,
    render: renderToString,
    resolve: resolveSsrPage,
    title: (title) => (title ? `${title} | ${appName}` : appName),
    setup: ({ App, props }) => <App {...props} />,
  }),
);
