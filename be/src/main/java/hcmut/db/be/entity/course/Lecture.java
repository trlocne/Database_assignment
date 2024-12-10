package hcmut.db.be.entity.course;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.*;
import lombok.*;

@Entity
@Table(name = "LECTURE")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Lecture {

    @EmbeddedId
    private LectureId id;

    @Column(name = "l_name", nullable = false)
    private String name;

    @Column(name = "video", nullable = false)
    private String video;

    @Column(name = "time_of_lecture", nullable = false)
    private int timeOfLecture;

    @Column(name = "status", length = 1)
    private String status;

    @ManyToOne
    @JoinColumns({
            @JoinColumn(name = "course_code", referencedColumnName = "course_code", insertable = false, updatable = false),
            @JoinColumn(name = "chapter", referencedColumnName = "chapter", insertable = false, updatable = false)
    })
    @JsonBackReference // Ngăn đệ quy khi serialize JSON
    private Section section;
}