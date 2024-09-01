package com.todo.index.service;

import com.todo.index.config.MongoConfig;
import com.todo.index.model.Todo;
import com.todo.index.repository.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;

@Service
public class TodoService {

    private final TodoRepository todoRepository;

    private final MongoConfig mongoConfig;

    @Autowired
    public TodoService(TodoRepository todoRepository, MongoConfig mongoConfig) {
        this.todoRepository = todoRepository;
        this.mongoConfig = mongoConfig;
    }

    public List<Todo> getAllTodos() {
        return todoRepository.findAll();
    }

    public Todo createTodo(Todo todo) {
        return todoRepository.save(todo);
    }

    public Todo getTodoById(String id) {
        return todoRepository.findById(id).orElse(null);
    }

    public Todo updateTodo(String id, Todo updatedTodo) {
        Todo todo = todoRepository.findById(id).orElse(null);
        if (todo != null) {
            todo.setTitle(updatedTodo.getTitle());
            todo.setCompleted(updatedTodo.isCompleted());
            return todoRepository.save(todo);
        }
        return null;
    }

    public void deleteTodo(String id) {
        todoRepository.deleteById(id);
    }
}
