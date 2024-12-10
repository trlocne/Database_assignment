package hcmut.db.be.entity.course;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.*;

import java.io.Serializable;

@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LectureId implements Serializable {

    @Column(name = "course_code", nullable = false, length = 15)
    private String courseCode;

    @Column(name = "chapter", nullable = false)
    private int chapter;

    @Column(name = "number", nullable = false)
    private int number;
}