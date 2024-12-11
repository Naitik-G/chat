import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-gray-800 text-white py-4">
      <nav className="container mx-auto flex justify-between">
        <Link to="/" className="text-xl font-bold">MERN Chat</Link>
        <div>
          <Link to="/login" className="mx-2">Login</Link>
          <Link to="/register" className="mx-2">Register</Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
