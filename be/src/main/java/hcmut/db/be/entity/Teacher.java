package hcmut.db.be.entity;


import com.fasterxml.jackson.annotation.JsonBackReference;
import hcmut.db.be.entity.course.Course;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "TEACHER")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Teacher {
    @Id
    private Integer id;

    @OneToOne
    @MapsId
    @JoinColumn(name = "id", referencedColumnName = "id")
    private User user; // Liên kết với bảng User

    @Column(name = "bank_account")
    private String bankAccount;

    @OneToMany(mappedBy = "teacher")
    @JsonBackReference
    List<Course> courses;
}
