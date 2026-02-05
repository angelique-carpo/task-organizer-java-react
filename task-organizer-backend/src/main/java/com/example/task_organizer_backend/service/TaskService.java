package com.example.task_organizer_backend.service;

import com.example.task_organizer_backend.model.Task;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class TaskService {

    private final List<Task> tasks = new ArrayList<>();

    private Long nextId = 3L;

    public TaskService() {
        tasks.add(new Task(1L, "First task", false, LocalDate.now()));
        tasks.add(new Task(2L, "Second task", true, LocalDate.now().plusDays(1)));
    }

    public List<Task> getAllTasks() {
        return tasks;
    }

    public Task addTask(Task task) {
        if (task.getTitle() == null || task.getTitle().trim().isEmpty()) {
            return null;
        }

        task.setId(nextId++);
        tasks.add(task);
        return task;
    }

    public boolean deleteTaskById(Long id) {
        return tasks.removeIf(task -> task.getId().equals(id));
    }
    public Task updateTask(Long id, Task updatedTask) {
        for (Task task : tasks) {
            if (task.getId().equals(id)) {
                task.setTitle(updatedTask.getTitle());
                task.setCompleted(updatedTask.isCompleted());
                task.setDueDate(updatedTask.getDueDate());
                return task;
            }
        }
        return null;
    }

}
