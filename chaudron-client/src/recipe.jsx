import React from "react"; 
import { useLocation } from "react-router-dom";
  
class Recipe extends React.Component { 

    constructor () {
        super()
        this.state = {
            action: "read",
            recipe : {
                id: null,
                name: "",
                content: "",
            }, 
            status : 0
        }
        
        this.recipe_id = extractRecipeIdFromURL()
        
      }

    async componentDidMount() {
        try {
            const fetched  = await fetch("/api/custom/recipes/" + this.recipe_id + "?contentType=text/html")
            const recipe = await fetched.json();
            this.setState({ ...this.state, recipe: recipe, status: fetched.status })
        } catch (e) {
            console.log(e)
            this.setState({ ...this.state, status : 1000 })
        }
    }

    render() { 
        let statusBadge = {
            type: "info",
            text: ""
        }
        if (this.state.status == 0) {
            statusBadge.text = "Chargement..."
            statusBadge.type = "warning"
        } else if (this.state.status >= 400) {
            statusBadge.text = "Erreur de chargement de la recette"
            statusBadge.type = "error"
        } else {
            statusBadge.text = "Recette en mode lecture"
            statusBadge.type = "info"
        }
        
        return (
            <div id="recipe">
                <div className={"badge badge-" + statusBadge.type + " gap-2"}>
                    {statusBadge.text}
                </div>
                <h1>{this.state.recipe.name}</h1>
                <div dangerouslySetInnerHTML={{ __html: this.state.recipe.content }} />
            </div>
        )
    } 
} 

function extractRecipeIdFromURL() {
    const url = window.location.pathname
    const parts = url.split("/")
    return parseInt(parts[2])
}

export default Recipe