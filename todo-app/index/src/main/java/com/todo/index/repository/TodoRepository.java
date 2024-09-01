package com.todo.index.repository;

import com.todo.index.model.Todo;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface TodoRepository extends MongoRepository<Todo, String> {

    // Custom query method to find todos by title
    Todo findByTitle(String title);
    // Custom query method to find todos by title and completion status
    Todo findByTitleAndCompleted(String title, boolean completed);
}
