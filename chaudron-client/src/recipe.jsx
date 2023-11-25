import React from "react"; 
import { useLocation } from "react-router-dom";
import EditableTextarea, {setEditableTextAreaValue, editableTextAreaValue} from "./EditableTextArea";
  
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

        this.handleNameInputChange = this.handleNameInputChange.bind(this);

        this.handleClick = this.handleClick.bind(this);
        
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
                this.setState({ ...this.state, recipe: recipe, status: fetched.status })
            } catch (e) {
                console.log(e)
                this.setState({ ...this.state, status : 1000 })
            }
        } else { // write
            try {
                const fetched  = await fetch("/api/custom/recipes/" + this.recipe_id + "?contentType=text/markdown")
                const recipe = await fetched.json();

                this.setState({ ...this.state, recipe: recipe, status: fetched.status, inputName: recipe.name })
                setEditableTextAreaValue(this.state.recipe.content)
            } catch (e) {
                console.log(e)
                this.setState({ ...this.state, status : 1000 })
                
            }
            
        }
        
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
    }



    
} 


function extractRecipeIdFromURL() {
    const url = window.location.pathname
    const parts = url.split("/")
    return parseInt(parts[2])
}


export default Recipe