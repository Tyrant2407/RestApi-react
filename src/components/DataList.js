// src/components/DataList.js
import React from 'react';
import DataItem from './DataItem';

const DataList = ({ data, onDelete, onEdit }) => {
  return (
    <div>
      {data.map(item => (
        <DataItem key={item.id} item={item} onDelete={onDelete} onEdit={onEdit} />
      ))}
    </div>
  );
};

export default DataList;
