import React from 'react';
import { useNavigate } from 'react-router-dom';
import { connectedUser } from './login';

function NewRecipeButton() {
    const navigate = useNavigate();

    // creation d'une nouvelle recette
    const handleNewRecipeClick = async () => {
      try {
        // Appel à la route sur le serveur pour créer une nouvelle recette
        const response = await fetch('/api/custom/recipes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${connectedUser() ? connectedUser().token : ''}`
          },
          body: JSON.stringify({
            name: 'Ma nouvelle recette',
            content: 'Ajoutez ici le contenu de votre recette',
          }),
        });

        console.log(response)
    
        if (response.ok) {
          // Récupération de l'ID de la nouvelle recette
          const recipe = await response.json();
    
          // Redirection vers la page de la nouvelle recette
          navigate(`/recettes/${recipe.id}`);
        } else {
          console.error('Erreur lors de la création de la recette');
        }
      } catch (error) {
        console.error('Erreur lors de la création de la recette', error);
      }
    };

    return (
      <>
        <button onClick={handleNewRecipeClick} className="btn normal-case text-xl mr-4">
            <span className='text-slate-500 text-3xl'>+</span> Ajouter une nouvelle recette
        </button>
      </>
    );
  }
  
  export default NewRecipeButton;


  
  