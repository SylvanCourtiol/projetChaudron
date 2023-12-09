import React from 'react';
import { useNavigate } from 'react-router-dom';
import { connectedUser } from './login';

function NewRecipeButton() {
    const navigate = useNavigate();

    const handleNewRecipeClick = async () => {
      try {
        // Création d'une nouvelle recette côté serveur
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
          const recipe = await response.json();
          navigate(`/recettes/${recipe.id}`);
        } else {
          console.error('Erreur lors de la création de la recette');
        }
      } catch (error) {
        console.error('Erreur lors de la création de la recette', error);
      }
    };

    const authentificationRequiredMessage = connectedUser() ? "" : (<p className="text-xs text-slate-500">Connexion requise pour ajouter une nouvelle recette.</p>)
    return (
      <>
        <button onClick={handleNewRecipeClick} className="btn normal-case text-xl mr-4" disabled={connectedUser() == null}>
            <span className='text-slate-500 text-3xl'>+</span> Ajouter une nouvelle recette
        </button>
        {authentificationRequiredMessage}
      </>
    );
  }
  
  export default NewRecipeButton;


  
  