package com.example.task_organizer_backend.repository;

import com.example.task_organizer_backend.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Long> {
}
