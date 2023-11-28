import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Header() {
    const navigate = useNavigate();
  
    const handleLoginClick = () => {
      // Redirige vers la page de connexion
      navigate('/login');
    };
  
    return (
      <>
        <div className="navbar bg-base-100 flex justify-between items-center">
          <img src="ChaudronHorizontalLogo.png" height="170" width="170" alt="Logo" />
          <div className="flex items-center">
            <button onClick={handleLoginClick} className="btn btn-ghost normal-case text-xl mr-4">
              Login
            </button>
            <Link to="/" className="btn btn-ghost normal-case text-xl">
              Recettes
            </Link>
          </div>
        </div>
      </>
    );
  }
  
  export default Header;