import React from "react"; 
import { useLocation } from "react-router-dom";
import EditableTextarea, {setEditableTextAreaValue} from "./EditableTextArea";
  
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
            status : 0
        }
        
        this.recipe_id = extractRecipeIdFromURL()
        
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
        } else {
            try {
                const fetched  = await fetch("/api/custom/recipes/" + this.recipe_id + "?contentType=text/markdown")
                const recipe = await fetched.json();
                this.setState({ ...this.state, recipe: recipe, status: fetched.status })
            } catch (e) {
                console.log(e)
                this.setState({ ...this.state, status : 1000 })
                
            }
            setEditableTextAreaValue(this.state.recipe.content)
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
        let textarea = this.state.recipe.content
        

        function handleTextChange() {
            console.log(textarea)
        }
        return (
            // <div id="recipe">
            //     <h1>{this.state.recipe.name}</h1>
            //     <div dangerouslySetInnerHTML={{ __html: this.state.recipe.content }} />
            // </div>
            <div>
                <h1>{this.state.recipe.name}</h1>
                <EditableTextarea
          initialValue={textarea}
          onTextChange={this.handleTextChange}
        /> 
                {this.state.recipe.content}
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