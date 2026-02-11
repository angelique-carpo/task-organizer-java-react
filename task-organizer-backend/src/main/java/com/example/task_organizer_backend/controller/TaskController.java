package com.example.task_organizer_backend.controller;

import com.example.task_organizer_backend.model.Task;
import com.example.task_organizer_backend.service.TaskService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;
import jakarta.validation.Valid;


import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/tasks")
public class TaskController {


    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping
    public ResponseEntity<List<Task>> getTasks() {
        return ResponseEntity.ok(taskService.getAllTasks());
    }


    @PostMapping
    public ResponseEntity<Task> createTask(@Valid @RequestBody Task task) {

        Task createdTask = taskService.addTask(task);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdTask);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id) {
        taskService.deleteTaskById(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Task> updateTask(@PathVariable Long id,
                                           @Valid @RequestBody Task task) {

        Task updated = taskService.updateTask(id, task);
        return ResponseEntity.ok(updated);
    }

}
