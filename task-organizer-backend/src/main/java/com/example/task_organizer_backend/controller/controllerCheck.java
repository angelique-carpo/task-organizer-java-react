package com.example.task_organizer_backend.controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Map;

@RestController
public class controllerCheck {

    @GetMapping("/hello")
    public Map<String, String> hello() {
        return Map.of("message", "Backend Tester");
    }
}











