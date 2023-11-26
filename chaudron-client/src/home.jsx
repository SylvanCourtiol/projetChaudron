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
            <a href={`/recipe/${recipe.id}`} className="recipe-link">
            <span className="recipe-name">{recipe.name}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

/*
function renderStarRating(averageRating) {
    averageRating = parseFloat(averageRating);

    averageRating = 3.5;
    const totalStars = 5;
    const fullStars = Math.floor(averageRating);

    console.log(fullStars);
    let stars = '';


    //étoiles pleines
    for (let i = 0; i < fullStars; i++) {
      stars += '★';
    }
  
    // demi-étoiles
    if (averageRating - fullStars > 0) {
      stars += '½'; 
    }
  
    // étoiles vides
    for (let i = 0; i < totalStars - Math.ceil(averageRating); i++) {
      stars += '☆';
    }
    return `${stars} (${averageRating}/5)`; ;
  }
*/

export default Home;