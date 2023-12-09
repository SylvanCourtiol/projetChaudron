import React from 'react';
import { Link } from 'react-router-dom';
import logo from "./assets/ChaudronHorizontalLogo.png"
import LogButtons from './logButtons';

function Header() {
    return (
      <>
        <div className="navbar bg-base-100 flex justify-between items-center">
          <Link to="/" className="cursor-pointer">
            <img
              src={logo}
              height="170"
              width="170"
              alt="Logo"
              title='Accueil'
              style={{ cursor: 'pointer' }}
            />
          </Link>          
          <div className="flex items-center">
            <Link to="/" className="btn btn-ghost normal-case text-xl mr-4">
                Parcourir les recettes
            </Link>
            <LogButtons/>
          </div>
        </div>
      </>
    );
  }
  
  export default Header;


  
  