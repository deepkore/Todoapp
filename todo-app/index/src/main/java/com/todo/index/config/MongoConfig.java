package com.todo.index.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MongoConfig {

    @Value("${MONGODB_USERNAME}")
    private String username;

    @Value("${MONGODB_PASSWORD}")
    private String password;

    // Other configuration beans if needed...

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }
}
