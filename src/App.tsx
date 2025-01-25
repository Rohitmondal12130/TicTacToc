import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { GameBoard } from './components/GameBoard';
import { Auth } from './components/Auth';
import { Profile } from './components/Profile';
import { GameHistory } from './components/GameHistory';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { useAuth } from './hooks/useAuth';

function App() {
  const { session } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        {!session ? (
          <>
            <Route path="/auth" element={<Auth />} />
            <Route path="*" element={<Navigate to="/auth" replace />} />
          </>
        ) : (
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/play" element={<GameBoard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/history" element={<GameHistory />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;