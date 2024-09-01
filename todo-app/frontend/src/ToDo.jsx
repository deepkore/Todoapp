import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

function ToDo({ items, removeItem, editItem, handleCheckboxChange }) {
  return (
    <div className="todo-task">
      {items.map((item) => {
        const { id, title, isCompleted } = item;
        return (
          <article key={id} className={`todo-item ${isCompleted ? 'completed' : ''}`}>
            <p className="title">{title}</p>
            <div className="btn-container">
              <button type="button" className="edit-btn" onClick={() => editItem(id)}>
                <FaEdit className="icons" />
              </button>
              <button type="button" className="delete-btn" onClick={() => removeItem(id)}>
                <FaTrash className="icons" />
              </button>
              <input
                type="checkbox"
                className="checkbox"
                checked={isCompleted}
                onChange={() => handleCheckboxChange(id, !isCompleted)}
              />
            </div>
          </article>
        );
      })}
    </div>
  );
}

export default ToDo;
