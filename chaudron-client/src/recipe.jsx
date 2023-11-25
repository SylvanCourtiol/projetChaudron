import React from "react";
import EditableTextarea, {setEditableTextAreaValue, editableTextAreaValue} from "./EditableTextArea";
import { toast } from 'react-toastify';

class Recipe extends React.Component { 

    constructor () {
        super()
        this.state = {
            action: "write",
            recipe : {
                id: null,
                name: "",
                content: "",
            }, 
            status : 0,
            inputName: ""
        }   
        
        this.recipe_id = extractRecipeIdFromURL()

        document.title = 'Chargement... | Recettes Chaudron';


        // Pour que les fonctions soit dans le bon contexte de this
        this.handleNameInputChange = this.handleNameInputChange.bind(this);
        this.handleClick = this.handleClick.bind(this);  
        this.updateURL = this.updateURL.bind(this);  
      }

      handleNameInputChange(event) {
        if (this.setState !== undefined) {
            this.setState({ ...this.state, inputName: event.target.value})
        }
        
    }

    async componentDidMount() {
        if (this.state.action == "read") {
            try {
                const fetched  = await fetch("/api/custom/recipes/" + this.recipe_id + "?contentType=text/html")
                const recipe = await fetched.json();
                this.state = { ...this.state, recipe: recipe, status: fetched.status }
                this.setState(this.state)
            } catch (e) {
                console.log(e)
                this.state = { ...this.state, status : 1000 }
                this.setState(this.state)
            }
        } else { // write
            try {
                const fetched  = await fetch("/api/custom/recipes/" + this.recipe_id + "?contentType=text/markdown")
                const recipe = await fetched.json();

                this.state = { ...this.state, recipe: recipe, status: fetched.status, inputName: recipe.name }
                this.setState(this.state)
                setEditableTextAreaValue(recipe.content)
                
            } catch (e) {
                console.log(e)
                this.state = { ...this.state, status : 1000 }
                this.setState(this.state)
                
            }
            
        }
        this.forceUpdate()
        this.updateURL()
        
    }

    handleTextChange = (newText) => {
        // this.setState((prevState) => ({
        //   recipe: {
        //     ...prevState.recipe,
        //     content: newText,
        //   },
        // }));
      };

    render() { 

        function handleTextChange() {
            console.log(textarea)
        }
        return (
            // <div id="recipe">
            //     <h1>{this.state.recipe.name}</h1>
            //     <div dangerouslySetInnerHTML={{ __html: this.state.recipe.content }} />
            // </div>
            <div>
                <input 
                    className="input input-bordered w-full max-w-xs"
                    type="text"
                    value={this.state.inputName}
                    onChange={this.handleNameInputChange}
                    placeholder="Entrez le nom de la recette ici"
                    readOnly={false}
                    disabled={false}
                />
                <EditableTextarea
                    initialValue={""}
                    onTextChange={this.handleTextChange}
                /> 
                <button onClick={this.handleClick} className="btn btn-active btn-primary">
                    Enregistrer
                </button>
            </div>
        )
    } 

    async handleClick() {

        const recipe_id = extractRecipeIdFromURL()

        const fetched  = await fetch("/api/custom/recipes/" + recipe_id, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                content: editableTextAreaValue,
                name: this.state.inputName,
            }),
        })
        if (this.state.status < 400) {
            toast.success('Succès de la mise à jour.')
        } else {
            toast.error('Echec de la mise à jour.')
        }

        await this.componentDidMount()
        this.updateURL()
    }

    updateURL() {
        let url = "/recettes/" + this.recipe_id;
        if (this.state.recipe.name && this.state.recipe.name.length > 0) {
            url += "/" + this.state.recipe.name
            document.title = this.state.recipe.name + ' | Recettes Chaudron';
        }
        if (this.state.action == "write") {
            url += "?action=write"
        }
        window.history.pushState(null, null, url);
    }

    
} 


function extractRecipeIdFromURL() {
    const url = window.location.pathname
    const parts = url.split("/")
    return parseInt(parts[2])
}


export default Recipe