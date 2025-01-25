import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

interface Profile {
  username: string;
  avatar_url: string;
}

export function Profile() {
  const [profile, setProfile] = useState<Profile>({ username: '', avatar_url: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [newUsername, setNewUsername] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('profiles')
        .select('username, avatar_url')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        return;
      }

      if (data) {
        setProfile(data);
        setNewUsername(data.username);
      }
    };

    fetchProfile();
  }, []);

  const handleUpdateProfile = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase
      .from('profiles')
      .update({ username: newUsername })
      .eq('id', user.id);

    if (error) {
      console.error('Error updating profile:', error);
      return;
    }

    setProfile({ ...profile, username: newUsername });
    setIsEditing(false);
  };

  return (
    <div className="max-w-2xl mx-auto bg-gray-900 rounded-lg shadow-xl p-8">
      <h2 className="text-2xl font-bold text-white mb-6">Profile</h2>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300">
            Username
          </label>
          {isEditing ? (
            <div className="mt-1 flex rounded-md shadow-sm">
              <input
                type="text"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                className="flex-1 min-w-0 block w-full rounded-md bg-gray-800 border-gray-700 text-white"
              />
            </div>
          ) : (
            <div className="mt-1 text-gray-300">{profile.username}</div>
          )}
        </div>

        <div className="flex justify-end space-x-4">
          {isEditing ? (
            <>
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 border border-gray-700 rounded-md shadow-sm text-sm font-medium text-gray-300 bg-gray-800 hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateProfile}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                Save
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
}