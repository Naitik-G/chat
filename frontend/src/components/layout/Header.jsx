import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-gray-800 text-white py-4">
      <nav className="container mx-auto flex justify-between">
        <Link to="/" className="text-xl font-bold">MERN Chat</Link>
        <div>
          {user ? (
            <>
              <span className="mx-2">Welcome, {user.username}</span>
              <button
                onClick={logout}
                className="mx-2 bg-red-500 px-2 py-1 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="mx-2">Login</Link>
              <Link to="/register" className="mx-2">Register</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
