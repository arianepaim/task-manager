package com.example.task.repositories;

import com.example.task.entities.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface TaskRepository extends JpaRepository<Task, Long> {

    @Query("SELECT t FROM Task t LEFT JOIN FETCH t.files")
    List<Task> findAllWithFiles();

    @Query("SELECT t FROM Task t LEFT JOIN FETCH t.files WHERE t.id = :taskId")
    Optional<Task> findByIdWithFiles(@Param("taskId") Long taskId);
}
