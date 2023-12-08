import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { connectedUser } from './login';

function LogButtons() {
    const navigate = useNavigate();

    const handleLogoutClick = () => {
        sessionStorage.clear();
        navigate('/')
    };

    const handleLoginClick = () => {
        // Redirige vers la page de connexion
        navigate('/login');
    };
  
      const handleRegisterClick = () => {
        // Redirige vers la page d'inscription
        navigate('/register');
    };

    const username = sessionStorage.getItem('username')

    if (connectedUser()) {
        return(
            <div style={{ textAlign: 'center'}}>
                <button onClick={handleLogoutClick} className="btn btn-ghost normal-case text-xl mr-4">
                Se déconnecter
                </button>
                <p className="text-slate-500 mr-4" style={{display: 'inline-block', textAlign: 'left'}}>Bienvenue <span className='font-bold'>{username}</span> !</p>
            </div>
        );
    } else {
        return(
            <div>
                <button onClick={handleLoginClick} className="btn btn-ghost normal-case text-xl mr-4">
                Se connecter
                </button>
                <button onClick={handleRegisterClick} className="btn btn-ghost normal-case text-xl">
                S'inscrire
                </button>
            </div>
        )
    }
}

export default LogButtons;