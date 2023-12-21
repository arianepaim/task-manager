package com.example.task.entities;

import com.example.task.enums.TaskStatus;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
@Table(name = "tb_task")
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotNull
    @NotBlank
    @Size(min = 3, message = "The description must contain at least 3 characters")
    private String description;
    @NotNull
    @Enumerated(EnumType.STRING)
    private TaskStatus status;

    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.REMOVE)
    @JoinColumn(name = "files_id", referencedColumnName = "id", foreignKey = @ForeignKey(name = "fk_task_files"))
    private Files files;
}
