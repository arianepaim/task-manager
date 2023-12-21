package com.example.task.handler;

import com.example.task.entities.error.ErrorMessage;
import com.example.task.entities.exceptions.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Date;

@RestControllerAdvice
public class RestExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<?> handlerResourceException(ResourceNotFoundException e) {

        ErrorMessage error = new ErrorMessage("Not found!", HttpStatus.NOT_FOUND.value(), new Date(), e.getMessage());
        return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
    }
}
