// src/components/Footer.jsx
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-800 border-t border-gray-700 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1 - About */}
          <div>
            <h3 className="text-lg font-semibold text-indigo-400 mb-4">
              DevBlog
            </h3>
            <p className="text-gray-400">
              A blogging platform for developers to share knowledge and ideas.
            </p>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-300 mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-400 hover:text-indigo-400 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/category/react"
                  className="text-gray-400 hover:text-indigo-400 transition-colors"
                >
                  React Posts
                </Link>
              </li>
              <li>
                <Link
                  to="/category/nodejs"
                  className="text-gray-400 hover:text-indigo-400 transition-colors"
                >
                  Node.js Posts
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 - Contact */}
          <div>
            <h3 className="text-lg font-semibold text-gray-300 mb-4">
              Connect
            </h3>
            <div className="flex space-x-4">
              <a
                href="https://github.com/Ayam62" // replace with your actual GitHub URL if different
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-indigo-400 transition-colors"
              >
                <span className="sr-only">GitHub</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 0C5.37 0 0 5.37 0 12a12 12 0 008.21 11.44c.6.11.82-.26.82-.58v-2.15c-3.34.73-4.04-1.61-4.04-1.61-.55-1.41-1.35-1.79-1.35-1.79-1.1-.75.08-.74.08-.74 1.22.09 1.87 1.26 1.87 1.26 1.08 1.85 2.83 1.32 3.52 1.01.11-.78.42-1.32.76-1.63-2.66-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 016 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.65.25 2.87.12 3.17.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.49 5.93.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12.01 12.01 0 0024 12c0-6.63-5.37-12-12-12z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a
      href="https://www.linkedin.com/in/ayam-kattel-327498311/"
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-400 hover:text-indigo-400 transition-colors"
    >
      <span className="sr-only">LinkedIn</span>
      <svg
        className="h-6 w-6"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 
        2.24 5 5 5h14c2.76 0 5-2.24 
        5-5v-14c0-2.76-2.24-5-5-5zm-11 
        19h-3v-10h3v10zm-1.5-11.27c-.97 
        0-1.75-.79-1.75-1.75s.78-1.75 
        1.75-1.75 1.75.79 1.75 
        1.75-.79 1.75-1.75 
        1.75zm13.5 11.27h-3v-5.6c0-1.34-.03-3.07-1.87-3.07-1.87 
        0-2.16 1.46-2.16 2.97v5.7h-3v-10h2.89v1.37h.04c.4-.75 
        1.38-1.54 2.83-1.54 3.02 0 3.58 1.99 3.58 4.57v5.6z"/>
      </svg>
    </a>
              
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} DevBlog. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
