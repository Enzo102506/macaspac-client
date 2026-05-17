import Button from '../../components/Button';
import authGif from '../../assets/Ichigow.gif';

const SignInPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-orange-950 text-white px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.95fr] xl:gap-16">
        <div className="rounded-[2rem] border border-orange-700/30 bg-slate-950/80 p-8 shadow-[0_30px_100px_rgba(0,0,0,0.55)] backdrop-blur-xl sm:p-10">
          <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-orange-300">
            <span>Welcome Back</span>
            <span className="h-px flex-1 bg-orange-500/30" />
          </div>
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Sign in and step forward into Ichigo's world
          </h1>
          <p className="mt-6 max-w-xl text-sm leading-7 text-orange-200 sm:text-base">
            Enter your access details to continue with the dark, streamlined interface. Your next Soul Reaper mission starts here.
          </p>

          <div className="mt-10 space-y-6">
            <div className="rounded-3xl border border-orange-500/20 bg-slate-900/80 p-5 shadow-inner shadow-orange-900/10">
              <label className="block text-xs font-semibold uppercase tracking-[0.28em] text-orange-300">
                Email
              </label>
              <input
                type="email"
                placeholder="you@example.com"
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
                className="mt-3 w-full rounded-3xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-sm text-white outline-none transition focus:border-orange-400"
              />
            </div>
            <div className="flex items-center justify-between text-sm text-orange-200">
              <label className="inline-flex items-center gap-2">
                <input type="checkbox" className="h-4 w-4 rounded border-slate-700 bg-slate-900 text-orange-400 focus:ring-orange-400" />
                Remember me
              </label>
              <a href="#" className="text-orange-300 hover:text-white">
                Forgot password?
              </a>
            </div>
            <Button to="/" variant="primary" className="w-full py-3 text-sm bg-orange-500 text-black border-orange-500 hover:bg-orange-400">
              Enter the Gate
            </Button>
            <div className="space-y-3 text-center text-sm text-orange-200">
              <p>Or continue with</p>
              <div className="grid gap-3 sm:grid-cols-2">
                <Button to="/" variant="primary" className="w-full py-3 text-sm bg-orange-500 text-black border-orange-500 hover:bg-orange-400">
                  Continue with Google
                </Button>
                <Button to="/" variant="primary" className="w-full py-3 text-sm bg-orange-500 text-black border-orange-500 hover:bg-orange-400">
                  Continue with Apple
                </Button>
              </div>
            </div>
            <p className="text-center text-sm text-orange-200">
              New here?{' '}
              <Button to="/auth/signup" variant="primary" className="inline-flex px-3 py-1 text-xs bg-orange-500 text-black border-orange-500 hover:bg-orange-400">
                Create account
              </Button>
            </p>
          </div>
        </div>

        <div className="rounded-[2rem] border border-orange-700/30 bg-slate-950/80 p-8 shadow-[0_30px_100px_rgba(0,0,0,0.55)] backdrop-blur-xl sm:p-10">
          <div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-orange-300">
            Ichigo Showcase
          </div>
          <div className="mt-8 rounded-[2rem] border border-orange-500/20 bg-slate-900/80 p-2 shadow-inner shadow-orange-900/10">
            <img
              src={authGif}
              alt="Ichigo animation"
              className="h-96 w-full rounded-[1.75rem] object-cover"
            />
          </div>
          <div className="mt-8 space-y-8">
            <div className="rounded-3xl border border-orange-500/15 bg-slate-900/80 p-6 shadow-inner shadow-orange-900/10">
              <p className="text-xs uppercase tracking-[0.32em] text-orange-300">Ichigo Mode</p>
              <h2 className="mt-4 text-2xl font-bold text-white">Step into the Soul World</h2>
              <p className="mt-4 text-sm leading-7 text-orange-200">
                This auth page is styled for Ichigo: bold, dark, and glowing with orange energy, just like a Soul Reaper interface.
              </p>
            </div>
            <div className="rounded-3xl border border-orange-500/15 bg-slate-900/80 p-6 shadow-inner shadow-orange-900/10">
              <div className="text-xs uppercase tracking-[0.32em] text-orange-300">Features</div>
              <ul className="mt-4 space-y-3 text-sm text-orange-200">
                <li>• Story Of The Strongest Soul Reaper</li>
                <li>• Ichigoat</li>
                <li>• THE GOAT</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
