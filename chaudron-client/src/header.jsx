import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from "../public/ChaudronHorizontalLogo.png"
import LogButtons from './logButtons';

function Header() {
    const navigate = useNavigate();

    // creation d'une nouvelle recette
    const handleNewRecipeClick = async () => {
      try {
        // Appel à la route sur le serveur pour créer une nouvelle recette
        const response = await fetch('/api/custom/recipes/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: ' Ma nouvelle recette',
            content: 'Ajoutez ici le contenu de votre recette',
          }),
        });

        console.log(response)
    
        if (response.ok) {
          // Récupération de l'ID de la nouvelle recette
          const { recipeId } = await response.json();
    
          // Redirection vers la page de la nouvelle recette
          navigate(`/recettes/${recipeId}`);
        } else {
          console.error('Erreur lors de la création de la recette');
        }
      } catch (error) {
        console.error('Erreur lors de la création de la recette', error);
      }
    };

    return (
      <>
        <div className="navbar bg-base-100 flex justify-between items-center">
          <img src={logo} height="170" width="170" alt="Logo" />
          <div className="flex items-center">
          <button onClick={handleNewRecipeClick} className="btn btn-ghost normal-case text-xl mr-4">
              Nouvelle recette
          </button>
          <Link to="/" className="btn btn-ghost normal-case text-xl">
              Recettes
          </Link>
          <LogButtons/>
          </div>
        </div>
      </>
    );
  }
  
  export default Header;


  
  