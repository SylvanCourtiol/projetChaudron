import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Ajoutez ici la logique pour gérer la soumission du formulaire (inscription côté client).
    if (password !== confirmPassword) {
      // Gestion du cas où les mots de passe ne correspondent pas
      console.error("Les mots de passe ne correspondent pas");
      return;
    }

    fetch('/api/custom/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: username, password: password, email: email, dob: dob }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Gérer la réponse du serveur après l'inscription
        console.log('Utilisateur inscrit avec succès:', data);
        // Vous pouvez également rediriger l'utilisateur vers la page de connexion
        navigate('/login');
      })
      .catch((error) => console.error('Erreur lors de l\'inscription', error));
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md grid grid-cols-1 gap-6 max-w-sm w-full">
        <h2 className="text-3xl font-semibold text-center">Inscription</h2>

        <div>
            <label htmlFor="email" className="text-gray-700">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
              required
            />
          </div>

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

          <div>
            <label htmlFor="confirmPassword" className="text-gray-700">Confirmer le mot de passe:</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="dob" className="text-gray-700">Date de naissance:</label>
            <input
              type="date"
              id="dob"
              name="dob"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 w-full"
          >
            S'inscrire
          </button>

          <p className="text-center text-gray-600 mt-2">
            Déjà inscrit? <Link to="/login" className="text-blue-500 hover:underline">Se connecter</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;