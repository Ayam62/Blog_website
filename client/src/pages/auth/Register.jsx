// src/pages/Public/Register.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../services/api';
import { useAuth } from '../../context/Authcontext';

export default function Register() {
  const navigate = useNavigate();
  const {setIsLoggedIn}=useAuth()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await registerUser(formData);
      //setIsLoggedIn(true)
      navigate('/login'); // redirect to login or dashboard on success
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 rounded-lg shadow-lg p-8 w-full max-w-md space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-indigo-400">Create an Account</h2>

        {error && (
          <div className="bg-red-900/20 border border-red-500 text-red-300 px-4 py-2 rounded">
            {error}
          </div>
        )}

        <div>
          <label className="block text-sm mb-1" htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded bg-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm mb-1" htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded bg-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm mb-1" htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded bg-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 transition-colors text-white font-semibold py-2 px-4 rounded"
        >
          {loading ? 'Registering...' : 'Register'}
        </button>

        <p className="text-sm text-center text-gray-400">
          Already have an account?{' '}
          <a href="/login" className="text-indigo-400 hover:underline">
            Log in
          </a>
        </p>
      </form>
    </div>
  );
}
