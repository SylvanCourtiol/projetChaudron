import { useLocation } from "react-router-dom";

import React from "react"; 
  
class Recipe extends React.Component { 

    constructor () {
        super()
        this.state = {content:"Chargement..."}
      }

    async componentDidMount() {
        try {
            const fetched  = await fetch("/api/custom/recipes/1/content", {
                headers: {
                    "Content-Type": "text/html"
                }
            })
            const text = await fetched.text();
            this.setState({ content: text })
        } catch (e) {
            this.setState({ content: "Erreur de chargement de la recette" })
        }
    }

    render() { 
        return (
            <div id="recipe">
                {this.state.content}
            </div>
        )
    } 
} 

export default Recipe