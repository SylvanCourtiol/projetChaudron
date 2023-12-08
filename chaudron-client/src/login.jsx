import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {

  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('/api/custom/users/authentification', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({username, password})
    })
    .then((response) => response.json())
    .then((data) => {
      sessionStorage.setItem('token', data.token);
      sessionStorage.setItem('id', data.id)
      sessionStorage.setItem('username', data.username)
      navigate('/');
    })
    .catch((error) => {
      console.error('Utilisateur non inscrit', error)
      toast.error('Nom d\'utilisateur ou mot de passe invalide, recommencez.')
      setPassword('')
      setUsername('')
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md grid grid-cols-1 gap-6 max-w-sm w-full">
        <h2 className="text-3xl font-semibold text-center">Connexion</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="text-gray-700">Nom d'utilisateur:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="text-gray-700">Mot de passe:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 w-full"
          >
            Se connecter
          </button>

          <p className="text-center text-gray-600 mt-2">
            Pas encore inscrit? <Link to="/register" className="text-blue-500 hover:underline">S'inscrire</Link>
          </p>

        </form>
      </div>
    </div>
  );
};

export function connectedUser() {
  const user = sessionStorage.getItem('username')
  const token = sessionStorage.getItem('token')
  const id = sessionStorage.getItem('id')
  const credentials = {user, token, id}
  if ( user && token && id) {
    return credentials
  }
  return null
}

export default Login;
