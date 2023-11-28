import React, { useState } from 'react'

class Stars extends React.Component { 

    constructor ({initialNote, editable, onNoteChange}) {
        super()
        this.state = {
            note: initialNote,
            editable: editable,
            onNoteChange: onNoteChange,
        }

        // Pour que les fonctions soit dans le bon contexte de this
        this.handleNoteChange = this.handleNoteChange.bind(this); 
    }

    render() { 
        const note = this.state.note
    
        
    
        const inputName = "note-" + Date.now

        return (
            <>
                <div className="rating rating-lg rating-half">
                    <input type="radio" name={inputName} checked={note == 0} value={0} onChange={this.handleNoteChange} disabled={!this.state.editable} className="rating-hidden" />
                    <input type="radio" name={inputName} checked={note == 1} value={1} onChange={this.handleNoteChange} disabled={!this.state.editable} className="bg-green-500 mask mask-star-2 mask-half-1" />
                    <input type="radio" name={inputName} checked={note == 2} value={2} onChange={this.handleNoteChange} disabled={!this.state.editable} className="bg-green-500 mask mask-star-2 mask-half-2" />
                    <input type="radio" name={inputName} checked={note == 3} value={3} onChange={this.handleNoteChange} disabled={!this.state.editable} className="bg-green-500 mask mask-star-2 mask-half-1" />
                    <input type="radio" name={inputName} checked={note == 4} value={4} onChange={this.handleNoteChange} disabled={!this.state.editable} className="bg-green-500 mask mask-star-2 mask-half-2" />
                    <input type="radio" name={inputName} checked={note == 5} value={5} onChange={this.handleNoteChange} disabled={!this.state.editable} className="bg-green-500 mask mask-star-2 mask-half-1" />
                    <input type="radio" name={inputName} checked={note == 6} value={6} onChange={this.handleNoteChange} disabled={!this.state.editable} className="bg-green-500 mask mask-star-2 mask-half-2" />
                    <input type="radio" name={inputName} checked={note == 7} value={7} onChange={this.handleNoteChange} disabled={!this.state.editable} className="bg-green-500 mask mask-star-2 mask-half-1" />
                    <input type="radio" name={inputName} checked={note == 8} value={8} onChange={this.handleNoteChange} disabled={!this.state.editable} className="bg-green-500 mask mask-star-2 mask-half-2" />
                    <input type="radio" name={inputName} checked={note == 9} value={9} onChange={this.handleNoteChange} disabled={!this.state.editable} className="bg-green-500 mask mask-star-2 mask-half-1" />
                    <input type="radio" name={inputName} checked={note == 10} value={10} onChange={this.handleNoteChange} disabled={!this.state.editable} className="bg-green-500 mask mask-star-2 mask-half-2" />
                </div>
            </>
        )
    }

    handleNoteChange(event) {
        // if (!this.state.editable) {
        //     return
        // }
        this.state.note = event.target.value
        this.setState(this.state)
        if (this.state.onNoteChange) {
            this.state.onNoteChange(this.state.note)
        }     
    }
}

export default Stars