import React from 'react';
import { Bot } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-6 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <Bot className="text-blue-500 w-8 h-8 mr-2" />
          <h1 className="text-2xl font-bold text-gray-800">AI Tool Directory</h1>
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li><Link to="/" className="text-gray-600 hover:text-blue-500">Home</Link></li>
            <li><Link to="/categories" className="text-gray-600 hover:text-blue-500">Categories</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;