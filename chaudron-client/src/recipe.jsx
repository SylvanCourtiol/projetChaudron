import React from "react";
import EditableTextarea, {setEditableTextAreaValue, editableTextAreaValue} from "./EditableTextArea";
import { toast } from 'react-toastify';
import './recipe.css';
import Stars from "./stars";
import { connectedUser } from "./login";

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
            user: connectedUser(),
            note: 5,
            userNote: 5,
            status : 0,
            noteStatus : 0,
            userNoteStatus: 0,
            userNoteUpdateStatus: 0,
            inputName: "",
            toggleEditionMode : false,
        }   
        
        //this.state.user = { id: 5, username: "dakou"} // TODO enlever

        this.recipe_id = extractRecipeIdFromURL()

        document.title = 'Chargement... | Recettes Chaudron';


        // Pour que les fonctions soit dans le bon contexte de this
        this.handleNameInputChange = this.handleNameInputChange.bind(this);
        this.handleClick = this.handleClick.bind(this);  
        this.updateURL = this.updateURL.bind(this);  
        this.handleToggleEditionMode = this.handleToggleEditionMode.bind(this); 
        this.onNoteChange = this.onNoteChange.bind(this);
        this.getAverageMark = this.getAverageMark.bind(this);
      }

      handleNameInputChange(event) {
        if (this.setState !== undefined) {
            this.setState({ ...this.state, inputName: event.target.value})
        }
        
    }

    render() { 
        this.state.action = this.state.user ? extractActionFromURL() : "read"
        this.state.toggleEditionMode = this.state.action == "write"

        let content = (<h1>Erreur</h1>)
        if (this.state.action == "read") {
            content = (
                <div className="recipe-content" dangerouslySetInnerHTML={{ __html: this.state.recipe.content }} />
            )
        } else {
            content = (
                <div className="w-full">
                    <label className="cursor-pointer label w-full label flex flex-col">
                        <span className="label-text">Nom de la recette</span> 
                        <input 
                            className="input input-bordered w-full max-w-xs"
                            type="text"
                            value={this.state.inputName}
                            onChange={this.handleNameInputChange}
                            placeholder="Entrez le nom de la recette ici"
                            readOnly={false}
                            disabled={false}
                        />
                    </label>
                    <label className="cursor-pointer label flex flex-col">
                        <span className="label-text">Contenu de la page (format markdown supporté)</span>
                        <EditableTextarea
                            initialValue={""}
                            onTextChange={() => {}}
                        />
                    </label>
                    <button onClick={this.handleClick} className="btn btn-active btn-primary">
                        Enregistrer
                    </button>
                </div>
            )
        }

        let notePersonnelle = ""
        if (this.state.user) {
            notePersonnelle = (
                <tr>
                    <td className="w-1/2">Note personnelle</td>
                    <td className="w-1/2"><Stars initialValue={this.state.userNote} editable={true} onNoteChange={this.onNoteChange} /></td>
                </tr>
            )
        }

        return (
            <div className="recipe-page">
                <div className="flex flex-row">
                        <div className="form-control w-52 edition-toggle">
                            <label className="cursor-pointer label">
                            <span className="label-text">Mode édition</span> 
                            <input 
                                type="checkbox" 
                                className="toggle toggle-primary"
                                checked={this.state.toggleEditionMode}
                                onChange={this.handleToggleEditionMode}
                                readOnly={false}
                                disabled={this.state.user == null} />
                            </label>
                        </div>
                        {
                            this.state.user ? "" 
                            : <div className="inline-block">
                                <div className="flex items-center w-full h-full">
                                <p className="text-xs text-slate-500">Connexion requise pour activer le mode édition.</p>
                                </div>
                            </div>
                        }
                </div>
                <div className="card card-compact bg-base-100 shadow-xl recipe-card w-9/12">
                    
                    <h1 className="chaudron-font text-6xl">{this.state.recipe.name}</h1>
                    <table><tbody>
                        <tr>
                            <td className="w-1/2">Note moyenne</td>
                            <td className="w-1/2"><Stars initialValue={this.state.note} editable={false} onNoteChange={() => {}} /></td>
                        </tr>
                        {notePersonnelle}
                    </tbody></table>
                    
                    <hr></hr>
                    <div className="card-body">
                        { content }
                    </div>
                </div>
            </div>

        )
    }

    async componentDidMount() {
        try {
            const contentType = this.state.action == "read" ? "text/html" : "text/markdown"
            const fetched  = await fetch("/api/custom/recipes/" + this.recipe_id + "?contentType=" + contentType)
            const recipe = await fetched.json()

            this.state = { ...this.state, recipe: recipe, status: fetched.status, inputName: recipe.name }
            this.setState(this.state)
            if (this.state.action == "write") {
                setEditableTextAreaValue(recipe.content)
            }
            
        } catch (e) {
            this.state = { ...this.state, status : 1000 }
            this.setState(this.state)
            
        } 
        await this.getAverageMark()
        await this.getUserMark()
        this.forceUpdate()
        this.updateURL()
        
    }

    async getAverageMark() {
        if (!this.state.recipe.id) {
            return
        }
        try {
            const fetched  = await fetch("/api/custom/recipesMarks/" + this.recipe_id)
            const recipeMark = await fetched.json()
            this.state.noteStatus = fetched.status
            this.state.note = recipeMark.mark || 0
        } catch (e) {
            this.state.noteStatus = 1000
        }
        this.setState(this.state)
        
    }

    async getUserMark() {
        if (!this.state.recipe.id) {
            return
        }
        try {
            const fetched  = await fetch("/api/custom/recipesMarks/" + this.recipe_id + "/" + this.state.user.id)
            let recipeMark = {mark:null}
            if (fetched.status < 400) {
                recipeMark = await fetched.json()
            }
            this.state.userNoteStatus = fetched.status
            this.state.userNote = recipeMark.mark || 0
        } catch (e) {
            this.state.userNoteStatus = 1000
        }
        this.setState(this.state)
        
    }

    async onNoteChange(value) {
        // Maj état local
        this.state.userNote = value
        this.setState(this.state)

        // Maj côté API
        const body = JSON.stringify({ mark: parseInt(this.state.userNote) })
        try {
            const fetched = await fetch("/api/custom/recipesMarks/" + this.recipe_id + "/" + this.state.user.id, {
                method: "PUT",
                body: body,
                headers: {
                    "Content-Type": "application/json",
                  },
            })
            this.state.userNoteUpdateStatus = fetched.status
        } catch (e) {
            this.state.userNoteUpdateStatus = 1000
        }
        if (this.state.userNoteUpdateStatus < 400) {
            toast.success("Merci d'avoir noté cette recette !")
            this.getAverageMark()
        } else {
            toast.error("Echec de la mise à jour de votre note.")
        }
        this.setState(this.state)
    }

    handleToggleEditionMode() {
        if (!this.state.user) {
            return
        }
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