import React from 'react';
import { useState } from 'react'
import { useEffect } from 'react'

function Home() {

  const [recipes, setRecipes] = useState([]);
  const [notes, setNotes] = useState([]);
 
  useEffect(() => {
    // Récupération des recettes
    fetch('/api/custom/recipes?noContent=true')
      .then((response) => response.json())
      .then((data) => setRecipes(data))
      .catch((error) => console.error('Erreur de récupération des recettes', error));
 
    // Récupération des moyennes
    fetch('http://localhost:3009/marks')
      .then((response) => response.json())
      .then((data) => setNotes(data))
      .catch((error) => console.error('Erreur de récupération des notes', error));
  }, []);
 
  console.log(JSON.stringify(recipes));
  console.log(JSON.stringify(notes));

  return (
    <div className="content">
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.id}>
            <a href={`/recipe/${recipe.id}`} className="recipe-link">
            <span className="recipe-name">{recipe.name}</span>
            <span className="star-rating">{renderStarRating(calculateAverageRating(recipe, notes))}</span>            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function calculateAverageRating(recipe, notes) {
  const recipeMarks = notes.filter((mark) => mark.recipe_id === recipe.id);

  if (recipeMarks.length === 0) {
    return 'Pas encore noté';
  }

  const totalRating = recipeMarks.reduce((sum, mark) => sum + mark.mark, 0);
  const averageRating = totalRating / recipeMarks.length;
  const roundedAverage = averageRating.toFixed(1);

  return `${roundedAverage}/5`;
}


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


export default Home;