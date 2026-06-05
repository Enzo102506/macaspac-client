import React, { useState } from 'react';
import Button from '../../components/Button';
import authGif from '../../assets/Ichigow.gif';
import { useNavigate, Link } from 'react-router-dom';
import { createUser } from '../../services/UserService';

const SignUpPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const validate = () => {
    const errors = {};
    const hasValue = (value) => String(value || '').trim().length > 0;

    if (!hasValue(firstName)) errors.firstName = 'First name is required.';
    if (!hasValue(lastName)) errors.lastName = 'Last name is required.';
    if (!hasValue(age) || !/^[0-9]+$/.test(age)) errors.age = 'Age must be a number.';
    if (!hasValue(contactNumber) || !/^[0-9]{11}$/.test(contactNumber)) {
      errors.contactNumber = 'Contact number must be 11 digits.';
    }
    if (!hasValue(email) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'Enter a valid email address.';
    }
    if (!hasValue(username) || /\s/.test(username)) {
      errors.username = 'Username is required and cannot contain spaces.';
    }
    if (!hasValue(password) || password.length < 8) {
      errors.password = 'Password must be at least 8 characters.';
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setError(Object.values(validationErrors)[0]);
      return;
    }

    try {
      const userData = {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim().toLowerCase(),
        username: username.trim(),
        contactNumber: contactNumber.trim(),
        age: age.trim(),
        gender,
        type: 'viewer',
        password,
        address: address.trim(),
        isActive,
      };

      await createUser(userData);
      setSuccess('Registration successful! Redirecting to login in 2 seconds...');
      setTimeout(() => navigate('/auth/signin'), 2000);
    } catch (err) {
      console.error('Error signing up:', err);
      setError(err.response?.data?.message || 'Error during registration. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-orange-950 text-white px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr] xl:gap-16">
        {/* Form Section */}
        <div className="rounded-[2rem] border border-orange-700/30 bg-slate-950/80 p-8 shadow-[0_30px_100px_rgba(0,0,0,0.55)] backdrop-blur-xl sm:p-10">
          <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-orange-300">
            <span>Create Access</span>
            <span className="h-px flex-1 bg-orange-500/30" />
          </div>
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Sign up to join Ichigo's Soul Reaper journey
          </h1>
          <p className="mt-6 max-w-xl text-sm leading-7 text-orange-200 sm:text-base">
            Register now and become part of the story. Secure your place with a bold form designed for Ichigo fans.
          </p>

          {error && (
            <div className="mt-4 p-3 rounded-lg bg-red-500/20 border border-red-500/50 text-red-300 text-sm">
              {error}
            </div>
          )}
          {success && (
            <div className="mt-4 p-3 rounded-lg bg-green-500/20 border border-green-500/50 text-green-300 text-sm">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-10 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* First Name */}
              <div className="rounded-3xl border border-orange-500/20 bg-slate-900/80 p-5 shadow-inner shadow-orange-900/10">
                <label className="block text-xs font-semibold uppercase tracking-[0.28em] text-orange-300">
                  First Name
                </label>
                <input
                  type="text"
                  placeholder="First name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="mt-3 w-full rounded-3xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-sm text-white outline-none transition focus:border-orange-400"
                />
              </div>

              {/* Last Name */}
              <div className="rounded-3xl border border-orange-500/20 bg-slate-900/80 p-5 shadow-inner shadow-orange-900/10">
                <label className="block text-xs font-semibold uppercase tracking-[0.28em] text-orange-300">
                  Last Name
                </label>
                <input
                  type="text"
                  placeholder="Last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="mt-3 w-full rounded-3xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-sm text-white outline-none transition focus:border-orange-400"
                />
              </div>
            </div>

            {/* Email */}
            <div className="rounded-3xl border border-orange-500/20 bg-slate-900/80 p-5 shadow-inner shadow-orange-900/10">
              <label className="block text-xs font-semibold uppercase tracking-[0.28em] text-orange-300">
                Email
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-3 w-full rounded-3xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-sm text-white outline-none transition focus:border-orange-400"
              />
            </div>

            {/* Username */}
            <div className="rounded-3xl border border-orange-500/20 bg-slate-900/80 p-5 shadow-inner shadow-orange-900/10">
              <label className="block text-xs font-semibold uppercase tracking-[0.28em] text-orange-300">
                Username
              </label>
              <input
                type="text"
                placeholder="username (no spaces)"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-3 w-full rounded-3xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-sm text-white outline-none transition focus:border-orange-400"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Age */}
              <div className="rounded-3xl border border-orange-500/20 bg-slate-900/80 p-5 shadow-inner shadow-orange-900/10">
                <label className="block text-xs font-semibold uppercase tracking-[0.28em] text-orange-300">
                  Age
                </label>
                <input
                  type="number"
                  placeholder="Age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="mt-3 w-full rounded-3xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-sm text-white outline-none transition focus:border-orange-400"
                />
              </div>

              {/* Contact Number */}
              <div className="rounded-3xl border border-orange-500/20 bg-slate-900/80 p-5 shadow-inner shadow-orange-900/10">
                <label className="block text-xs font-semibold uppercase tracking-[0.28em] text-orange-300">
                  Contact Number
                </label>
                <input
                  type="tel"
                  placeholder="09171234567"
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                  className="mt-3 w-full rounded-3xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-sm text-white outline-none transition focus:border-orange-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Gender */}
              <div className="rounded-3xl border border-orange-500/20 bg-slate-900/80 p-5 shadow-inner shadow-orange-900/10">
                <label className="block text-xs font-semibold uppercase tracking-[0.28em] text-orange-300">
                  Gender
                </label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="mt-3 w-full rounded-3xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-sm text-white outline-none transition focus:border-orange-400"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Role is fixed to viewer for public registration */}
              <div className="rounded-3xl border border-orange-500/20 bg-slate-900/80 p-5 shadow-inner shadow-orange-900/10">
                <label className="block text-xs font-semibold uppercase tracking-[0.28em] text-orange-300">
                  Role
                </label>
                <input
                  type="text"
                  value="viewer"
                  disabled
                  className="mt-3 w-full rounded-3xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-sm text-white outline-none"
                />
              </div>
            </div>

            {/* Password */}
            <div className="rounded-3xl border border-orange-500/20 bg-slate-900/80 p-5 shadow-inner shadow-orange-900/10">
              <label className="block text-xs font-semibold uppercase tracking-[0.28em] text-orange-300">
                Password
              </label>
              <div className="mt-3 relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Create a password (min 8 characters)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-3xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-sm text-white outline-none transition focus:border-orange-400 pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-orange-300 hover:text-orange-200"
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
            </div>

            {/* Address */}
            <div className="rounded-3xl border border-orange-500/20 bg-slate-900/80 p-5 shadow-inner shadow-orange-900/10">
              <label className="block text-xs font-semibold uppercase tracking-[0.28em] text-orange-300">
                Address
              </label>
              <input
                type="text"
                placeholder="Your address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="mt-3 w-full rounded-3xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-sm text-white outline-none transition focus:border-orange-400"
              />
            </div>

            {/* Active Switch */}
            <div className="rounded-3xl border border-orange-500/20 bg-slate-900/80 p-5 shadow-inner shadow-orange-900/10">
              <label className="flex items-center text-xs font-semibold uppercase tracking-[0.28em] text-orange-300 gap-3">
                <input
                  type="checkbox"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-700 bg-slate-900 text-orange-400 focus:ring-orange-400"
                />
                Account Active
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-3 text-sm bg-orange-500 text-black border-orange-500 hover:bg-orange-400 rounded-3xl font-semibold transition"
            >
              Create Account
            </button>
          </form>

          <p className="mt-6 text-sm text-orange-200">
            Already have an account?{' '}
            <Link to="/auth/signin" className="text-orange-300 hover:text-white font-semibold">
              Sign in here
            </Link>
          </p>
        </div>

        {/* Image Section */}
        <div className="rounded-[2rem] border border-orange-700/30 bg-slate-950/80 p-8 shadow-[0_30px_100px_rgba(0,0,0,0.55)] backdrop-blur-xl sm:p-10">
          <div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-orange-300">
            Ichigo Focus
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
              <p className="text-xs uppercase tracking-[0.32em] text-orange-300">Join the Ranks</p>
              <h2 className="mt-4 text-2xl font-bold text-white">Start your Soul Reaper path</h2>
              <p className="mt-4 text-sm leading-7 text-orange-200">
                Build an account with a sleek Ichigo-inspired layout that feels powerful and dramatic.
              </p>
            </div>
            <div className="rounded-3xl border border-orange-500/15 bg-slate-900/80 p-6 shadow-inner shadow-orange-900/10">
              <div className="text-xs uppercase tracking-[0.32em] text-orange-300">Why sign up?</div>
              <ul className="mt-4 space-y-3 text-sm text-orange-200">
                <li>• Access exclusive story pages</li>
                <li>• Keep your progress saved</li>
                <li>• Use the app with a powerful auth flow</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
