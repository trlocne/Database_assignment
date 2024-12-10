package hcmut.db.be.entity.course;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.*;

import java.io.Serializable;

@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
public class QuizId implements Serializable {

    @Column(name = "course_code", nullable = false, length = 15)
    private String courseCode;

    @Column(name = "chapter_number", nullable = false)
    private int chapterNumber;

    @Column(name = "code", nullable = false, length = 20)
    private String code;
}