import React from "react";
import EditableTextarea, {setEditableTextAreaValue, editableTextAreaValue} from "./EditableTextArea";
import { toast } from 'react-toastify';
import './recipe.css';
import Stars from "./stars";

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
            note: 7,
            userNote: 10,
            status : 0,
            inputName: "",
            toggleEditionMode : false,
        }   
        
        this.recipe_id = extractRecipeIdFromURL()

        document.title = 'Chargement... | Recettes Chaudron';


        // Pour que les fonctions soit dans le bon contexte de this
        this.handleNameInputChange = this.handleNameInputChange.bind(this);
        this.handleClick = this.handleClick.bind(this);  
        this.updateURL = this.updateURL.bind(this);  
        this.handleToggleEditionMode = this.handleToggleEditionMode.bind(this); 
        this.onNoteChange = this.onNoteChange.bind(this);
      }

      handleNameInputChange(event) {
        if (this.setState !== undefined) {
            this.setState({ ...this.state, inputName: event.target.value})
        }
        
    }

    render() { 
        this.state.action = extractActionFromURL()
        this.state.toggleEditionMode = this.state.action == "write"

        let content = (<h1>Erreur</h1>)
        if (this.state.action == "read") {
            content = (
                <div className="recipe-content" dangerouslySetInnerHTML={{ __html: this.state.recipe.content }} />
            )
        } else {
            content = (
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
                        onTextChange={() => {}}
                    /> 
                    <button onClick={this.handleClick} className="btn btn-active btn-primary">
                        Enregistrer
                    </button>
                </div>
            )
        }

        return (
            <div className="recipe-page">
                <div className="flex flex-col">
                        <div className="form-control w-52 edition-toggle">
                            <label className="cursor-pointer label">
                            <span className="label-text">Mode édition</span> 
                            <input 
                                type="checkbox" 
                                className="toggle toggle-primary"
                                checked={this.state.toggleEditionMode}
                                onChange={this.handleToggleEditionMode}
                                readOnly={false} />
                            </label>
                        </div>
                </div>
                <div className="card card-compact bg-base-100 shadow-xl recipe-card w-9/12">
                    
                    <h1 className="chaudron-font text-6xl">{this.state.recipe.name}</h1>
                    <table>
                        <tr>
                            <td className="w-1/2">Note moyenne</td>
                            <td className="w-1/2"><Stars initialValue={this.state.note} editable={false} onNoteChange={() => {}} /></td>
                        </tr>
                        <tr>
                            <td className="w-1/2">Note personnelle</td>
                            <td className="w-1/2"><Stars initialValue={this.state.userNote} editable={true} onNoteChange={this.onNoteChange} /></td>
                        </tr>
                    </table>
                    
                    <hr></hr>
                    <div class="card-body">
                        { content }
                    </div>
                </div>
            </div>

        )
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

    onNoteChange(value) {
        this.state.userNote = value
        this.setState(this.state)
    }

    handleToggleEditionMode() {
        this.state.toggleEditionMode = !this.state.toggleEditionMode
        this.state.action = this.state.toggleEditionMode ? "write" : "read"
        this.setState(this.state)
        this.updateURL()
        this.componentDidMount()
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
        window.history.pushState(null, null, url)
    }

    
} 


function extractRecipeIdFromURL() {
    const url = window.location.pathname
    const parts = url.split("/")
    return parseInt(parts[2])
}

function extractActionFromURL() {
    const queryParams = new URLSearchParams(window.location.search)
    const paramValue = queryParams.get('action')
    return paramValue == "write" ? "write" : "read"
}


export default Recipe