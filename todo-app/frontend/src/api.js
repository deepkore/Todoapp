const API_BASE_URL = 'https://backendtodo-vhqc.onrender.com/api/todo/entries';

export const fetchTodos = async () => {
  try {
    const response = await fetch(API_BASE_URL);
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error('Failed to fetch todos');
    }
  } catch (error) {
    console.error('Error fetching todos:', error);
    throw new Error('Failed to fetch todos');
  }
};

export const addTodo = async (title) => {
  try {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title }),
    });

    if (response.ok) {
      return await response.json();
    } else {
      const data = await response.json();
      console.error('Failed to add new task:', data);
      throw new Error(data.message || 'Failed to add new task');
    }
  } catch (error) {
    console.error('Error adding new task:', error);
    throw new Error('Failed to add new task');
  }
};

export const updateTodo = async (id, title) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title }),
    });

    if (response.ok) {
      return await response.json();
    } else {
      const data = await response.json();
      console.error('Failed to update value:', data);
      throw new Error(data.message || 'Failed to update value');
    }
  } catch (error) {
    console.error('Error updating value:', error);
    throw new Error('Failed to update value');
  }
};

export const deleteTodo = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      return true;
    } else {
      throw new Error('Failed to remove task');
    }
  } catch (error) {
    console.error('Error removing task:', error);
    throw new Error('Failed to remove task');
  }
};

export const updateCompletionStatus = async (id, isCompleted) => {
    try {
      const options = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify( isCompleted ),
      };
  
      const response = await fetch(`${API_BASE_URL}/${id}/completed`, options);

  
      if (!response.ok) {
        throw new Error('Completion status update failed');
      }
  
      // If the response is successful, return some data from the server
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  };


export const fetchTodoTitles = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/titles`);
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error('Failed to fetch todo titles');
    }
  } catch (error) {
    console.error('Error fetching todo titles:', error);
    throw new Error('Failed to fetch todo titles');
  }
};
