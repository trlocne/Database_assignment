package hcmut.db.be.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import hcmut.db.be.entity.course.SignedCourse;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "LEARNER")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Learner {
    @Id
    private Integer id;

    @OneToOne
    @MapsId
    @JoinColumn(name = "id", referencedColumnName = "id")
    private User user; // Liên kết với bảng User

    @Column(name = "bank_account")
    private String bankAccount;

    @Column(name = "number_of_completed_courses")
    private int numberOfCompletedCourses;

    @Column(name = "number_of_signed_courses")
    private int numberOfSignedCourses;

    @OneToMany(mappedBy = "learner", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonBackReference
    private List<SignedCourse> signedCourses;
}
