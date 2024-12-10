package hcmut.db.be.entity.course;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;
import java.util.Set;

@Entity
@Table(name = "SECTION")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Section {

    @EmbeddedId
    private SectionId id;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "amount_of_time", nullable = false)
    private int amountOfTime;

    @Column(name = "number_of_lecture", nullable = false)
    private int numberOfLecture;

    @ManyToOne
    @JoinColumn(name = "course_code", referencedColumnName = "code", insertable = false, updatable = false)
    @JsonBackReference
    private Course course;

    @OneToMany(mappedBy = "section")
    @JsonManagedReference // Quản lý quan hệ ở phía "parent"
    private List<Lecture> lectures;

    @OneToMany(mappedBy = "section")
    @JsonManagedReference // Quản lý quan hệ ở phía "parent"
    private List<Quiz> quizzes;
}