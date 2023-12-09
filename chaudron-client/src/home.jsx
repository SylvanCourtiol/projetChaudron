import React, { useState, useEffect } from 'react';
import Stars from './stars';
import { Helmet } from 'react-helmet';
import NewRecipeButton from './newRecipeButton';

function Home() {

  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    // Récupération des recettes
    fetch('/api/custom/recipes?noContent=true')
      .then((response) => response.json())
      .then(async (data) => {
        // Pour chaque recette, récupérer la note moyenne
        const recipesWithAverageMarks = await Promise.all(
          data.map(async (recipe) => {
            const averageMarkResponse = await fetch(`/api/custom/recipesMarks/${recipe.id}`);
            const averageMarkData = await averageMarkResponse.json();
            return {
              ...recipe,
              averageMark: averageMarkData.mark || 0,
            };
          })
        );

        setRecipes(recipesWithAverageMarks);
      })
      .catch((error) => console.error('Erreur de récupération des recettes', error));
  }, []);

  const noRecipeMessage = recipes.length <= 0 ? (<div className='m-8'>Oh mince, il n'y a aucune recette. Il faut en ajouter une nouvelle rapidement !</div>) : ""

  return (
    <div className="content">
      <Helmet>
        <title>Accueil - Chaudron</title>
      </Helmet>
      <NewRecipeButton />
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.id}>
            <a href={`/recettes/${recipe.id}`} className="recipe-link">
              <span className="recipe-name">{recipe.name}</span>
              <span className="recipe-rating">
                <Stars initialValue={recipe.averageMark} editable={false} onNoteChange={() => {}} />
              </span>
            </a>
          </li>
        ))}
      </ul>
      {noRecipeMessage}
    </div>
  );
}

export default Home;
