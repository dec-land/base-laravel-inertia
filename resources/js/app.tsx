import './bootstrap';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePage } from '@/pageResolver';

const appName = 'Fubball';

createInertiaApp({
  strictMode: true,
  resolve: resolvePage,
  title: (title) => {
    return title ? `${title} | ${appName}` : appName;
  },
  withApp(app) {
    return app;
  },
  progress: {
    color: '#4B5563',
  },
});
