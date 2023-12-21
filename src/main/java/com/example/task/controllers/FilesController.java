package com.example.task.controllers;

import com.example.task.entities.Files;
import com.example.task.entities.Task;
import com.example.task.entities.exceptions.ResourceNotFoundException;
import com.example.task.repositories.FilesRepository;
import com.example.task.repositories.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/uploadFile")
public class FilesController {

    @Autowired
    private FilesRepository filesRepository;

    @Autowired
    private TaskRepository repository;

    @PostMapping("/{idTask}")
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file, @PathVariable(name = "idTask", required = true) String idTask) throws IOException {
        Files files = processUploadFile(file, idTask);
        return ResponseEntity.ok(ServletUriComponentsBuilder.fromCurrentContextPath().path("/downloadFile/").path(files.getId().toString()).toUriString());
    }
    @PutMapping("/{idTask}")
    public ResponseEntity<String> updateFile(@RequestParam("file") MultipartFile file, @PathVariable(name = "idTask", required = true) String idTask) throws IOException {
        Files existingFiles = repository.findById(Long.valueOf(idTask))
                .map(Task::getFiles)
                .orElseThrow(() -> new ResourceNotFoundException("Task not found!"));

        if (existingFiles != null) {
            byte[] data = file.getBytes();
            String filename = file.getOriginalFilename();
            String type = file.getContentType();

            assert filename != null;
            validateFilename(filename);

            existingFiles.setData(data);
            existingFiles.setFileName(filename);
            existingFiles.setType(type);

            filesRepository.save(existingFiles);

            return ResponseEntity.ok("File updated successfully!");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Task or file not found");
        }
    }
    private Files processUploadFile(MultipartFile file, String idTask) throws IOException {
        byte[] data = file.getBytes();
        String filename = file.getOriginalFilename();
        String type = file.getContentType();

        assert filename != null;
        validateFilename(filename);

        Task task = repository.findById(Long.valueOf(idTask))
                .orElseThrow(() -> new ResourceNotFoundException("Task not found!"));

        Files files = filesRepository.saveAndFlush(Files.FilesBuilder.newBuilder(data)
                .withFileName(filename)
                .withType(type)
                .withTask(task)
                .build());

        task.setFiles(files);
        repository.save(task);
        return files;
    }

    private void validateFilename(String filename) {
        if (filename.contains("..")) {
            throw new RuntimeException("Sorry! Filename contains invalid path sequence!");
        }
    }
}
