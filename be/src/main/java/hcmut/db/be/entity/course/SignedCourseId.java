package hcmut.db.be.entity.course;

import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;

@Embeddable
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SignedCourseId implements Serializable {

    @Column(name = "learner_id", nullable = false)
    private Integer learnerId;

    @Column(name = "course_code", nullable = false, length = 15)
    private String courseCode;
}