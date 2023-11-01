import { useState } from 'react'
import { useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './header.jsx'
import Footer from './footer.jsx'

function App() {

  const [recipes, setRecipes] = useState([]);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    // Récupération des recettes
    fetch('/api/custom/recipes?noContent=true')
      .then((response) => response.json())
      .then((data) => setRecipes(data))
      .catch((error) => console.error('Erreur de récupération des recettes', error));

    // Récupération des notes
    fetch('http://localhost:3009/marks')
      .then((response) => response.json())
      .then((data) => setNotes(data))
      .catch((error) => console.error('Erreur de récupération des notes', error));
  }, []);

  console.log(JSON.stringify(recipes));
  console.log(JSON.stringify(notes));

  return (
    <div className="home-container">
    <Header />

    <div className="content">
      <ul>
        {recipes.map((recipe) => (
              <li key={recipe.id}>
              <a href={`/recipe/${recipe.id}`} className="recipe-link">
                {recipe.name}
                <span className="average-rating">{calculateAverageRating(recipe, notes)}</span>
              </a>
            </li>
            
            ))}
      </ul>
    </div>

    <Footer />
  </div>
    
  )
}


function calculateAverageRating(recipe, notes) {
  const recipeMarks = notes.filter((mark) => mark.recipe_id === recipe.id);

  if (recipeMarks.length === 0) {
    return 'Pas encore noté';
  }

  // Calculer la moyenne des notes
  const totalRating = recipeMarks.reduce((sum, mark) => sum + mark.mark, 0);
  const averageRating = totalRating / recipeMarks.length;
  const roundedAverage = averageRating.toFixed(1);

  return `${roundedAverage}/5`;
}
export default App
