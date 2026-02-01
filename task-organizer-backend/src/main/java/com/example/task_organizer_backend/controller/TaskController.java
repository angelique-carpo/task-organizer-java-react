package com.example.task_organizer_backend.controller;

import com.example.task_organizer_backend.model.Task;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class TaskController {

    @GetMapping("/api/tasks")
    public List<Task> getTasks() {
        return List.of(
                new Task(1L, "First task", false),
                new Task(2L, "Second task", true)
        );
    }
}
