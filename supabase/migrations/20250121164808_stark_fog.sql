/*
  # Initial Schema Setup for Tic Tac Toe Game

  1. New Tables
    - profiles
      - id (uuid, matches auth.users)
      - username (text)
      - avatar_url (text)
      - updated_at (timestamp)
    
    - games
      - id (uuid)
      - player_x (uuid, references profiles)
      - player_o (uuid, references profiles)
      - winner (uuid, references profiles)
      - moves (jsonb)
      - is_vs_computer (boolean)
      - created_at (timestamp)
      
  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create profiles table
CREATE TABLE profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  username text UNIQUE,
  avatar_url text,
  updated_at timestamptz DEFAULT now()
);

-- Create games table
CREATE TABLE games (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  player_x uuid REFERENCES profiles(id),
  player_o uuid REFERENCES profiles(id),
  winner uuid REFERENCES profiles(id),
  moves jsonb DEFAULT '[]'::jsonb,
  is_vs_computer boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE games ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Games policies
CREATE POLICY "Games are viewable by players"
  ON games FOR SELECT
  USING (
    auth.uid() = player_x OR 
    auth.uid() = player_o
  );

CREATE POLICY "Authenticated users can create games"
  ON games FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = player_x OR auth.uid() = player_o);

CREATE POLICY "Players can update their games"
  ON games FOR UPDATE
  USING (
    auth.uid() = player_x OR 
    auth.uid() = player_o
  );