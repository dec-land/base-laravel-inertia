import type { AxiosInstance } from 'axios';
import type Echo from 'laravel-echo';
import type Pusher from 'pusher-js';
import type { route as ziggyRoute } from 'ziggy-js';
import type { PageProps as AppPageProps } from './';

declare global {
  interface Window {
    axios: AxiosInstance;
    Pusher: typeof Pusher;
    Echo: Echo;
  }

  var route: typeof ziggyRoute;

  interface PaginatedData<T> {
    data: T[];
    current_page: number;
    first_page_url: string;
    from: number | null;
    last_page: number;
    last_page_url: string;
    links: Array<{ url: string | null; label: string; active: boolean }>;
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number | null;
    total: number;
  }
}

declare module '@inertiajs/core' {
  interface PageProps extends AppPageProps {}

  interface InertiaConfig {
    sharedPageProps: AppPageProps;
  }
}
