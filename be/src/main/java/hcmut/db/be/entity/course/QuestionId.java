package hcmut.db.be.entity.course;

import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;

@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
public class QuestionId implements Serializable {

    @Column(name = "course_code", length = 15, nullable = false)
    private String courseCode;

    @Column(name = "chapter_number", nullable = false)
    private Integer chapterNumber;

    @Column(name = "quiz_code", length = 20, nullable = false)
    private String quizCode;

    @Column(name = "question_code", length = 20, nullable = false)
    private String questionCode;
}