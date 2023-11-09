import { useState } from 'react'
import { useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './header.jsx'
import Footer from './footer.jsx'
import Home from './home.jsx'

function App() {

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
    <div className="home-container">
    <Header />

    <Home recipes={recipes} notes={notes} />

    <Footer />
  </div>
    
  )
}

export default App
