import React, { useState } from 'react';
import Button from '../../components/Button';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../../services/UserService';

const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log('Login button clicked');
    try {
      // Call the login API
      const { data } = await loginUser({ email, password });
      console.log('Login successful:', data);

      localStorage.setItem('firstName', data.firstName);
      localStorage.setItem('token', data.token);
      localStorage.setItem('type', data.type);

      const redirectTo = data.type === 'viewer'
        ? '/'
        : data.type === 'editor'
          ? '/dashboard/articles'
          : '/dashboard';

      navigate(redirectTo, { state: { firstName: data.firstName, type: data.type } });
    } catch (err) {
      console.error('Login failed:', err.response?.data?.message || err.message);
      setError(err.response?.data?.message || 'Login failed. Please try again');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-orange-950 text-white px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl rounded-[2rem] border border-orange-700/30 bg-slate-950/80 p-8 shadow-[0_30px_100px_rgba(0,0,0,0.55)] backdrop-blur-xl sm:p-10">
        <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-orange-300">
          <span>Welcome Back</span>
          <span className="h-px flex-1 bg-orange-500/30" />
        </div>
        <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Sign in to Your Portal
        </h1>
        <p className="mt-6 max-w-xl text-sm leading-7 text-orange-200 sm:text-base">
          Enter your access details to continue. Your next mission starts here.
        </p>

        {error && <div className="mt-4 p-3 rounded-lg bg-red-500/20 border border-red-500/50 text-red-300">{error}</div>}

        <form onSubmit={handleLogin}>
          <div className="mt-10 space-y-6">
            <div className="rounded-3xl border border-orange-500/20 bg-slate-900/80 p-5 shadow-inner shadow-orange-900/10">
              <label className="block text-xs font-semibold uppercase tracking-[0.28em] text-orange-300">
                Email
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-3 w-full rounded-3xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-sm text-white outline-none transition focus:border-orange-400"
              />
            </div>
            <div className="rounded-3xl border border-orange-500/20 bg-slate-900/80 p-5 shadow-inner shadow-orange-900/10">
              <label className="block text-xs font-semibold uppercase tracking-[0.28em] text-orange-300">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-3 w-full rounded-3xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-sm text-white outline-none transition focus:border-orange-400"
              />
            </div>
            <div className="flex items-center justify-between text-sm text-orange-200">
              <label className="inline-flex items-center gap-2">
                <input type="checkbox" className="h-4 w-4 rounded border-slate-700 bg-slate-900 text-orange-400 focus:ring-orange-400" />
                Remember me
              </label>
              <Link to="/" className="text-orange-300 hover:text-white">
                Forgot password?
              </Link>
            </div>
            <button type="submit" className="w-full py-3 text-sm bg-orange-500 text-black border-orange-500 hover:bg-orange-400 rounded-3xl font-semibold transition">
              Login
            </button>
          </div>
        </form>
        <p className="mt-6 text-sm text-orange-200">
          Don't have an account? <Link to="/auth/signup" className="text-orange-300 hover:text-white font-semibold">Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default SignInPage;
