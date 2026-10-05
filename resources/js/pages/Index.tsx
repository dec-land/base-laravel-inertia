import { Head, Link, router, usePage } from '@inertiajs/react';
import type { ReactElement } from 'react';
import type { PageProps } from '@/types';

type Props = {
  appName?: string;
  message?: string;
};

export default function Index({
  appName = 'Laravel + Inertia',
  message = 'Welcome to your new application!',
}: Props): ReactElement {
  const { auth } = usePage<PageProps>().props;

  return (
    <>
      <Head title="Home" />
      <main className="p-8 max-w-lg mx-auto">
        <h1 className="text-2xl font-bold">{appName}</h1>
        <p className="mt-2 text-sm">{message}</p>

        <hr className="my-6 border-base-300" />

        {auth.user ? (
          <div>
            <p>
              Logged in as <strong>{auth.user.name}</strong>
            </p>
            <button
              type="button"
              onClick={() => router.post('/logout')}
              className="btn btn-sm mt-3"
            >
              Log Out
            </button>
          </div>
        ) : (
          <div>
            <p>You are not logged in.</p>
            <Link href="/login" className="btn btn-primary btn-sm mt-3">
              Log In
            </Link>
          </div>
        )}
      </main>
    </>
  );
}
