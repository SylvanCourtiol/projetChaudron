import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';


const Login = () => {
    const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [jwt, setJwt] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ajoutez ici la logique pour gérer la soumission du formulaire (connexion côté client).

    fetch('/api/custom/users/authentification?name=' + username + '&password=' + password)
      .then((response) => response.text())
      .then((data) => {
        setJwt(data);
        sessionStorage.setItem('token', data);
      })
      .catch((error) => console.error('Utilisateur non inscrit', error));
    console.log('Nom d\'utilisateur:', username);
    console.log('Mot de passe:', password);
    navigate('/');

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
            //className="bg-green-500 text-white p-2 rounded hover:bg-green-600 w-full"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 w-full"
          >
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
