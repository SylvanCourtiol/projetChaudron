import React, { useState } from 'react';

export let setEditableTextAreaValue = null

const EditableTextarea = ({ initialValue, onTextChange }) => {
  const [textValue, setTextValue] = useState(initialValue || '');
  setEditableTextAreaValue = setTextValue

  const handleTextChange = (event) => {
    setTextValue(event.target.value);
    onTextChange(event.target.value); // Appeler la fonction onTextChange pour transmettre la nouvelle valeur
  };

  return (
    <div>
      <textarea id="recipe"
        value={textValue}
        onChange={handleTextChange}
        rows="4"
        cols="50"
        readOnly={false}
      />
    </div>
  );
};

export default EditableTextarea;