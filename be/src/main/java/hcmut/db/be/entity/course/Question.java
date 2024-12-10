package hcmut.db.be.entity.course;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "QUESTION")
public class Question {

    @EmbeddedId
    private QuestionId id;

    @Column(name = "content", nullable = false, columnDefinition = "nvarchar(MAX)")
    private String content;

    @Column(name = "answer", nullable = false, columnDefinition = "nvarchar(MAX)")
    private String answer;

    @Column(name = "type", nullable = false, columnDefinition = "nvarchar(MAX)")
    private String type;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumns({
            @JoinColumn(name = "course_code", referencedColumnName = "course_code", insertable = false, updatable = false),
            @JoinColumn(name = "chapter_number", referencedColumnName = "chapter_number", insertable = false, updatable = false),
            @JoinColumn(name = "quiz_code", referencedColumnName = "code", insertable = false, updatable = false)
    })
    @JsonBackReference
    private Quiz quiz;
}