package com.example.task_organizer_backend.service;

import com.example.task_organizer_backend.model.Task;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TaskService {

    private final List<Task> tasks = new ArrayList<>();

    public TaskService() {
        tasks.add(new Task(1L, "First task", false));
        tasks.add(new Task(2L, "Second task", true));
    }

    public List<Task> getAllTasks() {
        return tasks;
    }

    public Task addTask(Task task) {
        if (task.getTitle() == null || task.getTitle().trim().isEmpty()) {
            return null;
        }

        tasks.add(task);
        return task;
    }
    public void deleteTaskById(Long id) {
        tasks.removeIf(task -> task.getId().equals(id));
    }

    public Task updateTask(Long id, Task updatedTask) {
        if (updatedTask.getTitle() == null || updatedTask.getTitle().trim().isEmpty()) {
            return null;
        }

        for (Task task : tasks) {
            if (task.getId().equals(id)) {
                task.setTitle(updatedTask.getTitle());
                task.setCompleted(updatedTask.isCompleted());
                return task;
            }
        }
        return null;
    }

}
