package com.example.task_organizer_backend.service;

import com.example.task_organizer_backend.model.Task;
import com.example.task_organizer_backend.repository.TaskRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {

    private final TaskRepository taskRepository;

    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    public Task addTask(Task task) {
        if (task.getTitle() == null || task.getTitle().trim().isEmpty()) {
            return null;
        }
        return taskRepository.save(task);
    }

    public boolean deleteTaskById(Long id) {
        taskRepository.deleteById(id);
        return true;
    }

    public Task updateTask(Long id, Task updatedTask) {
        return taskRepository.findById(id)
                .map(task -> {
                    task.setTitle(updatedTask.getTitle());
                    task.setCompleted(updatedTask.isCompleted());
                    task.setDueDate(updatedTask.getDueDate());
                    task.setDescription(updatedTask.getDescription());
                    return taskRepository.save(task);
                })
                .orElse(null);
    }
}

