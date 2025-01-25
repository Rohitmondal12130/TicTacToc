import { create } from 'zustand';
import { supabase } from './supabase';

interface GameState {
  board: string[];
  currentPlayer: 'X' | 'O';
  winner: string | null;
  isVsComputer: boolean;
  makeMove: (index: number) => void;
  resetGame: () => void;
  setIsVsComputer: (value: boolean) => void;
}

export const useGameStore = create<GameState>((set, get) => ({
  board: Array(9).fill(''),
  currentPlayer: 'X',
  winner: null,
  isVsComputer: false,

  makeMove: async (index) => {
    const { board, currentPlayer, winner, isVsComputer } = get();
    
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;

    const newWinner = calculateWinner(newBoard);
    
    set({
      board: newBoard,
      currentPlayer: currentPlayer === 'X' ? 'O' : 'X',
      winner: newWinner
    });

    // Store the move in the database
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        if (newWinner || currentPlayer === 'O' || (isVsComputer && currentPlayer === 'X')) {
          const { error } = await supabase.from('games').insert({
            player_x: user.id,
            player_o: isVsComputer ? user.id : null,
            winner: newWinner ? user.id : null,
            moves: newBoard,
            is_vs_computer: isVsComputer
          });
          
          if (error) {
            console.error('Error saving game:', error);
          }
        }
      }
    } catch (error) {
      console.error('Error saving game:', error);
    }

    if (isVsComputer && !newWinner && currentPlayer === 'X') {
      // Computer's move
      const emptySpots = newBoard
        .map((spot, idx) => spot === '' ? idx : -1)
        .filter(idx => idx !== -1);
      
      if (emptySpots.length > 0) {
        const computerMove = emptySpots[Math.floor(Math.random() * emptySpots.length)];
        setTimeout(() => {
          get().makeMove(computerMove);
        }, 500);
      }
    }
  },

  resetGame: () => {
    set({
      board: Array(9).fill(''),
      currentPlayer: 'X',
      winner: null
    });
  },

  setIsVsComputer: (value) => {
    set({ isVsComputer: value });
    get().resetGame();
  }
}));

function calculateWinner(squares: string[]): string | null {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6] // diagonals
  ];

  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  if (squares.every(square => square !== '')) {
    return 'draw';
  }

  return null;
}