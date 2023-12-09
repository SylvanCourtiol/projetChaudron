import React, { useState } from 'react';

export let setEditableTextAreaValue = null
export let editableTextAreaValue = ""

const EditableTextarea = ({ initialValue, onTextChange }) => {
  [editableTextAreaValue, setEditableTextAreaValue] = useState(initialValue || '');

  const handleTextChange = (event) => {
    setEditableTextAreaValue(event.target.value);
    onTextChange(event.target.value);
  };

  return (
    <div>
      <textarea
        className="textarea textarea-bordered"
        value={editableTextAreaValue}
        onChange={handleTextChange}
        rows="20"
        cols="50"
        readOnly={false}
      />
    </div>
  );
};

export default EditableTextarea;