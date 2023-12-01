import React from 'react';
import { useState } from 'react'
import { useEffect } from 'react'

function Home() {

  const [recipes, setRecipes] = useState([]);
 
  useEffect(() => {
    // Récupération des recettes
    fetch('/api/custom/recipes?noContent=true')
      .then((response) => response.json())
      .then((data) => setRecipes(data))
      .catch((error) => console.error('Erreur de récupération des recettes', error));
 
  }, []);
 
  console.log(JSON.stringify(recipes));

  return (
    <div className="content">
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.id}>
            <a href={`/recettes/${recipe.id}`} className="recipe-link">
            <span className="recipe-name">{recipe.name}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;