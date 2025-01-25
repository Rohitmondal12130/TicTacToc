import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { TowerControl as GameController, History, User, LogOut, Home } from 'lucide-react';
import { supabase } from '../lib/supabase';

export function Layout() {
  const location = useLocation();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="min-h-screen bg-black">
      <nav className="bg-gray-900 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <GameController className="w-8 h-8 text-blue-500" />
              <span className="ml-2 text-xl font-bold text-white">GameHub</span>
            </div>

            <div className="flex items-center space-x-4">
              <Link
                to="/"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  location.pathname === '/'
                    ? 'bg-gray-800 text-white'
                    : 'text-gray-300 hover:bg-gray-700'
                }`}
              >
                <Home className="w-5 h-5 inline-block mr-1" />
                Home
              </Link>

              <Link
                to="/play"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  location.pathname === '/play'
                    ? 'bg-gray-800 text-white'
                    : 'text-gray-300 hover:bg-gray-700'
                }`}
              >
                <GameController className="w-5 h-5 inline-block mr-1" />
                Play
              </Link>

              <Link
                to="/history"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  location.pathname === '/history'
                    ? 'bg-gray-800 text-white'
                    : 'text-gray-300 hover:bg-gray-700'
                }`}
              >
                <History className="w-5 h-5 inline-block mr-1" />
                History
              </Link>

              <Link
                to="/profile"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  location.pathname === '/profile'
                    ? 'bg-gray-800 text-white'
                    : 'text-gray-300 hover:bg-gray-700'
                }`}
              >
                <User className="w-5 h-5 inline-block mr-1" />
                Profile
              </Link>

              <button
                onClick={handleSignOut}
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700"
              >
                <LogOut className="w-5 h-5 inline-block mr-1" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main>
        <Outlet />
      </main>
    </div>
  );
}