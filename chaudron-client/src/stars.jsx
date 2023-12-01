import React, { useState } from 'react'

class Stars extends React.Component { 

    constructor (props) {
        super(props)
        this.state = {
            note: Math.round(props.initialValue),
            editable: props.editable,
            onNoteChange: props.onNoteChange,
        }

        this.inputName = "note-" + Date.now()

        this.handleNoteChange = (event) => {
            // if (!this.state.editable) {
            //     return
            // }
            this.state.note = event.target.value
            this.setState({note: event.target.value})
            if (this.state.onNoteChange) {
                this.state.onNoteChange(this.state.note)
            }     
        }
        // Pour que les fonctions soit dans le bon contexte de this
        this.handleNoteChange = this.handleNoteChange.bind(this); 
    }

    componentDidUpdate(prevProps) {
        if (this.props.initialValue !== prevProps.initialValue) {
          this.setState({ note: Math.round(this.props.initialValue) });
        }
        if (this.props.editable !== prevProps.editable) {
            this.setState({ editable: this.props.editable });
        }
        if (this.props.onNoteChange !== prevProps.onNoteChange) {
            this.setState({ onNoteChange: this.props.onNoteChange });
        }
      }
 
    render() { 
        this.handleNoteChange = this.handleNoteChange.bind(this);
        return (
            <>
                <div className="rating rating-half">
                    <input type="radio" name={this.inputName} checked={this.state.note == 0} value={0} onChange={this.handleNoteChange} disabled={true} className="rating-hidden" />
                    <input type="radio" name={this.inputName} checked={this.state.note == 1} value={1} onChange={this.handleNoteChange} disabled={!this.state.editable} className="bg-slate-500 mask mask-star-2 mask-half-1" />
                    <input type="radio" name={this.inputName} checked={this.state.note == 2} value={2} onChange={this.handleNoteChange} disabled={!this.state.editable} className="bg-slate-500 mask mask-star-2 mask-half-2" />
                    <input type="radio" name={this.inputName} checked={this.state.note == 3} value={3} onChange={this.handleNoteChange} disabled={!this.state.editable} className="bg-slate-500 mask mask-star-2 mask-half-1" />
                    <input type="radio" name={this.inputName} checked={this.state.note == 4} value={4} onChange={this.handleNoteChange} disabled={!this.state.editable} className="bg-slate-500 mask mask-star-2 mask-half-2" />
                    <input type="radio" name={this.inputName} checked={this.state.note == 5} value={5} onChange={this.handleNoteChange} disabled={!this.state.editable} className="bg-slate-500 mask mask-star-2 mask-half-1" />
                    <input type="radio" name={this.inputName} checked={this.state.note == 6} value={6} onChange={this.handleNoteChange} disabled={!this.state.editable} className="bg-slate-500 mask mask-star-2 mask-half-2" />
                    <input type="radio" name={this.inputName} checked={this.state.note == 7} value={7} onChange={this.handleNoteChange} disabled={!this.state.editable} className="bg-slate-500 mask mask-star-2 mask-half-1" />
                    <input type="radio" name={this.inputName} checked={this.state.note == 8} value={8} onChange={this.handleNoteChange} disabled={!this.state.editable} className="bg-slate-500 mask mask-star-2 mask-half-2" />
                    <input type="radio" name={this.inputName} checked={this.state.note == 9} value={9} onChange={this.handleNoteChange} disabled={!this.state.editable} className="bg-slate-500 mask mask-star-2 mask-half-1" />
                    <input type="radio" name={this.inputName} checked={this.state.note == 10} value={10} onChange={this.handleNoteChange} disabled={!this.state.editable} className="bg-slate-500 mask mask-star-2 mask-half-2" />
                </div>
            </>
        )
    }
}

export default Stars