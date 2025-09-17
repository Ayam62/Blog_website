// src/components/Navbar.jsx
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/Authcontext.jsx';

export default function Navbar() {
  const { isLoggedIn, setIsLoggedIn, user } = useAuth(); // Assuming user data is available
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear token if you're using JWT
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <nav className="bg-gray-800 border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Logo/Brand */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-xl font-bold text-indigo-400 hover:text-indigo-300 transition-colors">
              DevBlog
            </Link>
          </div>

          {/* Middle - Navigation Links (shown when logged in) */}
          {isLoggedIn && (
            <div className="hidden md:flex space-x-6">
              <Link
                to="/create-post"
                className="px-3 py-2 text-sm font-medium text-gray-300 hover:text-indigo-400 transition-colors"
              >
                Create Post
              </Link>
              <Link
                to="/my-posts"
                className="px-3 py-2 text-sm font-medium text-gray-300 hover:text-indigo-400 transition-colors"
              >
                My Posts
              </Link>
            </div>
          )}

          {/* Right side - Auth buttons */}
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                {/* Mobile menu button (hidden on desktop) */}

                <div className="md:hidden">
                  {/* Mobile dropdown would go here */}
                </div>

                {/* User profile (desktop) */}
                <div className="hidden md:flex items-center space-x-3">
                  <span className="text-sm text-gray-300">
                    Hi, {user?.name || 'User'}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 rounded-md text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu (shown when logged in on mobile) */}
      {isLoggedIn && (
        <div className="md:hidden bg-gray-800 border-t border-gray-700">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/create-post"
              className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-indigo-400 hover:bg-gray-700 rounded-md"
            >
              Create Post
            </Link>
            <Link
              to="/my-posts"
              className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-indigo-400 hover:bg-gray-700 rounded-md"
            >
              My Posts
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}