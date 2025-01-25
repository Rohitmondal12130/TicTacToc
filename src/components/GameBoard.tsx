import React from 'react';
import { useGameStore } from '../lib/store';

export function GameBoard() {
  const { board, currentPlayer, winner, makeMove, resetGame, isVsComputer, setIsVsComputer } = useGameStore();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black p-4">
      <div className="mb-8">
        <button
          onClick={() => setIsVsComputer(false)}
          className={`px-4 py-2 rounded-l-lg ${
            !isVsComputer ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300'
          }`}
        >
          2 Players
        </button>
        <button
          onClick={() => setIsVsComputer(true)}
          className={`px-4 py-2 rounded-r-lg ${
            isVsComputer ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300'
          }`}
        >
          vs Computer
        </button>
      </div>

      <div className="mb-4 text-xl text-white">
        {winner
          ? winner === 'draw'
            ? "It's a draw!"
            : `Player ${winner} wins!`
          : `Current player: ${currentPlayer}`}
      </div>

      <div className="grid grid-cols-3 gap-2 bg-gray-900 p-4 rounded-lg">
        {board.map((cell, index) => (
          <button
            key={index}
            onClick={() => makeMove(index)}
            className={`w-24 h-24 text-4xl font-bold rounded-lg
              ${cell ? 'bg-gray-700' : 'bg-gray-800 hover:bg-gray-700'}
              ${cell === 'X' ? 'text-blue-500' : 'text-red-500'}`}
            disabled={!!cell || !!winner}
          >
            {cell}
          </button>
        ))}
      </div>

      <button
        onClick={resetGame}
        className="mt-8 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        New Game
      </button>
    </div>
  );
}