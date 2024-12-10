package hcmut.db.be.entity.course;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import hcmut.db.be.entity.Learner;
import hcmut.db.be.entity.comment.CommentSignedCourse;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.List;

@Entity
@Table(name = "SIGNED_COURSE")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SignedCourse {

    @EmbeddedId
    private SignedCourseId id;

    @Column(name = "rating", precision = 3, scale = 2)
    private BigDecimal rating;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "learner_id", insertable = false, updatable = false)
    @JsonBackReference
    private Learner learner;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_code", insertable = false, updatable = false)
    @JsonBackReference
    private Course course;

    @OneToMany(mappedBy = "signedCourse", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<CommentSignedCourse> comments;

}