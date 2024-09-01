import React, { useState, useEffect } from 'react';
import Alert from './Alert';
import ToDo from './ToDo';
import image from './todo-image.png';
import { fetchTodos, addTodo, updateTodo, deleteTodo, updateCompletionStatus } from './api';
import './App.css';

const getLocalStorage = () => {
  let list = localStorage.getItem('list');
  return list ? JSON.parse(list) : [];
};

function App() {
  const [name, setName] = useState('');
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({
    show: false,
    msg: '',
    type: '',
  });

  useEffect(() => {
    const fetchAndSetTodos = async () => {
      try {
        const todos = await fetchTodos();
        setList(todos);
      } catch (error) {
        showAlert(true, 'danger', 'Failed to fetch todos');
      }
    };

    fetchAndSetTodos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) {
      showAlert(true, 'danger', 'Please enter a value');
    } else if (name && isEditing) {
      try {
        await updateTodo(editID, name);
        setList((prevList) => {
          return prevList.map((item) => (item.id === editID ? { ...item, title: name } : item));
        });
        setName('');
        setEditID(null);
        setIsEditing(false);
        showAlert(true, 'success', 'Value changed');
      } catch (error) {
        showAlert(true, 'danger', error.message || 'Failed to update value');
      }
    } else {
      try {
        const newItem = await addTodo(name);
        setList([...list, newItem]);
        setName('');
        showAlert(true, 'success', 'New task added to the list');
      } catch (error) {
        showAlert(true, 'danger', error.message || 'Failed to add new task');
      }
    }
  };

  const handleCheckboxChange = async (id, isCompleted) => {
    try {
      await updateCompletionStatus(id, isCompleted);
      setList((prevList) =>
        prevList.map((item) => (item.id === id ? { ...item, isCompleted } : item))
      );
    } catch (error) {
      showAlert(true, 'danger', error.message || 'Failed to update completion status');
    }
  };
  

  const showAlert = (show = false, type = '', msg = '') => {
    setAlert({ show, type, msg });
  };

  const clearList = () => {
    showAlert(true, 'danger', 'Empty list');
    setList([]);
  };

  const removeItem = async (id) => {
    try {
      const success = await deleteTodo(id);
      if (success) {
        showAlert(true, 'danger', 'Task removed');
        setList(list.filter((item) => item.id !== id));
      } else {
        showAlert(true, 'danger', 'Failed to remove task');
      }
    } catch (error) {
      showAlert(true, 'danger', error.message || 'Failed to remove task');
    }
  };

  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditID(id);
    setName(specificItem.title);
  };

  const handleRetrieve = async () => {
    try {
      const titles = list.map((item) => item.title);
      showAlert(true, 'success', 'Fetched titles successfully');
    } catch (error) {
      showAlert(true, 'danger', 'Failed to retrieve titles');
    }
  };

  return (
    <>
      <div>
        <section className="section-center">
          <form className="todo-form" onSubmit={handleSubmit}>
            {alert.show && <Alert {...alert} removeAlert={() => showAlert(false)} />}
            <div className="form-control">
              <input
                type="text"
                className="todo"
                placeholder="Enter a new task to do"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <button type="submit" className="submit-btn">
                {isEditing ? 'edit' : 'submit'}
              </button>
            </div>
          </form>
          <div className="todo-container">
            {list.length > 0 && (
              <ToDo items={list} removeItem={removeItem} editItem={editItem} handleCheckboxChange={handleCheckboxChange} />
            )}
            <button className="clear-btn" onClick={clearList}>
              Clear items
            </button>
            <button className="retrieve-btn" onClick={handleRetrieve}>
              Retrieve
            </button>
          </div>
          <div className="img-container">
            <img src={image} alt="Todo" className="image" />
          </div>
        </section>
      </div>
    </>
  );
}

export default App;
