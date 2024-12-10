package hcmut.db.be.entity.comment;

import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.time.LocalDate;

@Embeddable
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CommentSignedCourseId implements Serializable {

    @Column(name = "learner_id", nullable = false)
    private Integer learnerId;

    @Column(name = "course_code", nullable = false, length = 15)
    private String courseCode;

    @Column(name = "date", nullable = false)
    private LocalDate date;
}

