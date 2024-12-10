package hcmut.db.be.entity.course;

import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;

@Embeddable
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SectionId implements Serializable {

    @Column(name = "course_code", nullable = false, length = 15)
    private String courseCode;

    @Column(name = "chapter", nullable = false)
    private int chapter;
}