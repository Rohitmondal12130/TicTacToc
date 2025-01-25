import React from 'react';
import { Link } from 'react-router-dom';
import { TowerControl, ChevronRight as ChessKnight, Dices } from 'lucide-react';

export function Home() {
  return (
    <div className="min-h-screen bg-black py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-12">Choose Your Game</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Tic Tac Toe */}
          <Link to="/play" className="block">
            <div className="bg-gray-900 rounded-lg p-8 hover:bg-gray-800 transition-colors">
              <div className="flex justify-center mb-6">
                <TowerControl className="w-16 h-16 text-blue-500" />
              </div>
              <h2 className="text-2xl font-bold text-white text-center mb-4">Tic Tac Toe</h2>
              <p className="text-gray-400 text-center">
                Classic game of X's and O's. Play against a friend or challenge the computer!
              </p>
            </div>
          </Link>

          {/* Coming Soon: Chess */}
          <div className="bg-gray-900/50 rounded-lg p-8 relative">
            <div className="absolute inset-0 flex items-center justify-center bg-black/80 rounded-lg">
              <span className="text-white font-semibold">Coming Soon</span>
            </div>
            <div className="flex justify-center mb-6">
              <ChessKnight className="w-16 h-16 text-gray-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-600 text-center mb-4">Chess</h2>
            <p className="text-gray-600 text-center">
              Strategic board game of kings and queens.
            </p>
          </div>

          {/* Coming Soon: Dice Games */}
          <div className="bg-gray-900/50 rounded-lg p-8 relative">
            <div className="absolute inset-0 flex items-center justify-center bg-black/80 rounded-lg">
              <span className="text-white font-semibold">Coming Soon</span>
            </div>
            <div className="flex justify-center mb-6">
              <Dices className="w-16 h-16 text-gray-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-600 text-center mb-4">Dice Games</h2>
            <p className="text-gray-600 text-center">
              Collection of exciting dice-based games.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}