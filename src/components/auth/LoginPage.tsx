import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';

export default function LoginPage() {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await login(username, password);
    } catch (err: any) {
      const message = err?.response?.data?.message || 'Login failed. Please try again.';
      setError(message);
      setSubmitting(false);
    }
  };

  const handleDemo = () => {
    const demoUser = {
      id: 0,
      username: 'demo',
      password: 'demo',
      firstName: 'Demo',
      lastName: 'User',
      role: 'demo',
    };
    localStorage.setItem('user', JSON.stringify(demoUser));
    window.location.assign('/');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md border-4 border-black bg-white">
        <div className="bg-black px-6 py-5 flex items-center gap-4">
          <div className="w-12 h-12 bg-white flex items-center justify-center border-4 border-black">
            <svg className="w-6 h-6 text-black" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-bold uppercase tracking-tight text-white">Welcome back</p>
            <h1 className="text-2xl font-bold uppercase tracking-tight text-white">Login</h1>
          </div>
        </div>

        <form className="p-6 space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-tight text-gray-600" htmlFor="username">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              className="w-full border-2 border-gray-400 px-4 py-3 text-base font-medium uppercase focus:outline-none focus:border-black"
              placeholder="YOUR USERNAME"
              required
              autoComplete="username"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-tight text-gray-600" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full border-2 border-gray-400 px-4 py-3 text-base font-medium focus:outline-none focus:border-black"
              placeholder="YOUR PASSWORD"
              required
              autoComplete="current-password"
            />
          </div>

          {error && (
            <div className="border-2 border-red-600 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-red-600 text-white py-3 px-6 text-base font-bold uppercase tracking-tight border-4 border-red-600 disabled:opacity-60 btn-dynamic"
          >
            {submitting ? 'Logging in...' : 'Login'}
          </button>

          <button
            type="button"
            onClick={handleDemo}
            className="w-full border-4 border-black py-3 px-6 text-base font-bold uppercase tracking-tight text-black bg-white hover:bg-gray-100 btn-dynamic"
          >
            Continue as Demo
          </button>

          <div className="text-center text-xs uppercase font-semibold text-gray-500">
            Don&apos;t have an account?{' '}
            <a className="text-black underline" href="/signup">
              Sign up
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
