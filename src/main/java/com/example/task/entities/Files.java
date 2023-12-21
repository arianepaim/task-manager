package com.example.task.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
@Table(name = "tb_files")
public class Files {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String fileName;
    private String type;
    private byte[] data;

    @JsonIgnore
    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.REMOVE)
    @JoinColumn(name = "tasks_id", referencedColumnName = "id", foreignKey = @ForeignKey(name = "id"))
    private Task task;

    public Files(String fileName, String type, byte[] data, Task task) {
        this.fileName = fileName;
        this.type = type;
        this.data = data;
        this.task = task;
    }

    public static class FilesBuilder {
        private String fileName;
        private String type;
        private byte[] data;
        private Task task;

        public FilesBuilder withFileName(String fileName) {
            this.fileName = fileName;
            return this;
        }

        public FilesBuilder withType(String type) {
            this.type = type;
            return this;
        }

        public static FilesBuilder newBuilder(byte[] data) {
            return new FilesBuilder(data);
        }

        public FilesBuilder(byte[] data) {
            this.data = data;
        }

        public FilesBuilder withTask(Task task) {
            this.task = task;
            return this;
        }

        public Files build() {
            return new Files(fileName, type, data, task);
        }
    }

}
