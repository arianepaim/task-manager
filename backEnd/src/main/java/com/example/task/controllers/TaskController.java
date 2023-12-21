package com.example.task.controllers;

import com.example.task.entities.Task;
import com.example.task.entities.exceptions.ResourceNotFoundException;
import com.example.task.repositories.TaskRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    @Autowired
    private TaskRepository repository;

    @GetMapping
    public ResponseEntity<List<Task>> findAll() {
        List<Task> tasks = repository.findAllWithFiles();
        return ResponseEntity.ok().body(tasks);
    }
    @GetMapping("/{id}")
    public ResponseEntity<Task> findById(@PathVariable Long id) {
        Task task = repository.findByIdWithFiles(id)
                .orElseThrow(() -> new ResourceNotFoundException("Task not found!"));
        return ResponseEntity.ok().body(task);
    }


    @PostMapping
    public ResponseEntity<Task> insert(@Valid @RequestBody Task task) {
        task = repository.save(task);
        return ResponseEntity.status(HttpStatus.CREATED).body(task);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Task> update(@Valid @RequestBody Task task, @PathVariable Long id) {
        Task existingTask = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Task not found!"));

        task.setId(id);
        existingTask.setDescription(task.getDescription());
        existingTask.setStatus(task.getStatus());

        if (task.getFiles() != null) {
            existingTask.setFiles(task.getFiles());
        }  else {
            task.setFiles(existingTask.getFiles());
        }

        task = repository.save(task);
        return ResponseEntity.status(HttpStatus.CREATED).body(task);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return ResponseEntity.ok().body("Task deleted successfully");
        } else {
            throw new ResourceNotFoundException("Task not found!");
        }
    }

}
