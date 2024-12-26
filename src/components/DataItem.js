// src/components/DataItem.js
import React from 'react';

const DataItem = ({ item, onDelete, onEdit }) => {
  return (
    <div>
      <h3>{item.title}</h3>
      <p>{item.body}</p>
      <button onClick={() => onEdit(item)}>Edit</button>
      <button onClick={() => onDelete(item.id)}>Delete</button>
    </div>
  );
};

export default DataItem;
