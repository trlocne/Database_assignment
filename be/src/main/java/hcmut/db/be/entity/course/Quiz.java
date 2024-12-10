package hcmut.db.be.entity.course;

import jakarta.persistence.*;
import lombok.*;
import com.fasterxml.jackson.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "QUIZ")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Quiz {

    @EmbeddedId
    private QuizId id;

    @Column(name = "title", nullable = true, columnDefinition = "nvarchar(max)")
    private String title;

    @Column(name = "homework_time", nullable = false)
    private int homeworkTime;

    @Column(name = "pass_score", nullable = true, precision = 3, scale = 1)
    private BigDecimal passScore;

    @ManyToOne
    @JoinColumns({
            @JoinColumn(name = "course_code", referencedColumnName = "course_code", insertable = false, updatable = false),
            @JoinColumn(name = "chapter_number", referencedColumnName = "chapter", insertable = false, updatable = false)
    })
    @JsonBackReference // Ngăn vòng lặp khi serialize JSON
    private Section section;

    @PrePersist
    public void prePersist() {
        if (this.passScore == null) {
            this.passScore = new BigDecimal("0.5"); // Giá trị mặc định
        }
    }

    @OneToMany(mappedBy = "quiz", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Question> questions;

}