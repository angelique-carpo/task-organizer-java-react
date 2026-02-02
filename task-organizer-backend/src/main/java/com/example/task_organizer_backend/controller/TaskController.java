package com.example.task_organizer_backend.controller;

import com.example.task_organizer_backend.model.Task;
import com.example.task_organizer_backend.service.TaskService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;




import java.util.List;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping
    public List<Task> getTasks() {
        return taskService.getAllTasks();
    }

    @PostMapping
    public ResponseEntity<?> createTask(@RequestBody Task task) {
        Task createdTask = taskService.addTask(task);

        if (createdTask == null) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("Title is required");
        }

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(createdTask);
    }

    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable Long id) {
        taskService.deleteTaskById(id);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateTask(@PathVariable Long id, @RequestBody Task task) {
        Task updatedTask = taskService.updateTask(id, task);

        if (updatedTask == null) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body("Task not found or invalid title");
        }

        return ResponseEntity.ok(updatedTask);
    }

}
