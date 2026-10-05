import { Head, useForm } from '@inertiajs/react';
import type { ReactElement, SubmitEvent } from 'react';

export default function Login(): ReactElement {
  const { data, setData, post, processing, errors } = useForm({
    email: '',
    password: '',
    remember: false,
  });

  const submit = (e: SubmitEvent): void => {
    e.preventDefault();
    post('/login');
  };

  return (
    <>
      <Head title="Login" />
      <main className="p-8 max-w-sm mx-auto">
        <h1 className="text-2xl font-bold mb-4">Sign In</h1>

        <form onSubmit={submit} className="flex flex-col gap-4">
          <div>
            <label className="label text-sm" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="input input-bordered w-full"
              value={data.email}
              onChange={(e) => setData('email', e.target.value)}
              autoComplete="username"
              required
            />
            {errors.email ? <p className="text-error text-xs mt-1">{errors.email}</p> : null}
          </div>

          <div>
            <label className="label text-sm" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="input input-bordered w-full"
              value={data.password}
              onChange={(e) => setData('password', e.target.value)}
              autoComplete="current-password"
              required
            />
            {errors.password ? <p className="text-error text-xs mt-1">{errors.password}</p> : null}
          </div>

          <label className="flex items-center gap-2 cursor-pointer text-sm">
            <input
              type="checkbox"
              className="checkbox checkbox-sm"
              checked={data.remember}
              onChange={(e) => setData('remember', e.target.checked)}
            />
            Remember me
          </label>

          <button type="submit" disabled={processing} className="btn btn-primary mt-2">
            {processing ? 'Logging in...' : 'Log In'}
          </button>
        </form>
      </main>
    </>
  );
}
