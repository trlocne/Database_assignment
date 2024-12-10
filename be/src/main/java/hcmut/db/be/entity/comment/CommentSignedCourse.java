package hcmut.db.be.entity.comment;

import com.fasterxml.jackson.annotation.JsonBackReference;
import hcmut.db.be.entity.course.SignedCourse;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "COMMENT_SIGNED_COURSE")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CommentSignedCourse {

    @EmbeddedId
    private CommentSignedCourseId id;

    @Column(name = "content", nullable = false, length = 200)
    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumns({
            @JoinColumn(name = "learner_id", referencedColumnName = "learner_id", insertable = false, updatable = false),
            @JoinColumn(name = "course_code", referencedColumnName = "course_code", insertable = false, updatable = false)
    })
    @JsonBackReference
    private SignedCourse signedCourse;
}

