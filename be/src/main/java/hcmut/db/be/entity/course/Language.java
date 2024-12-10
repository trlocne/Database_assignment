package hcmut.db.be.entity.course;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "LANGUAGE")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@IdClass(LanguageId.class) // Sử dụng IdClass cho composite key
public class Language {

    @Id
    @Column(name = "course_code", nullable = false, length = 15)
    private String courseCode;

    @Id
    @Column(name = "language", nullable = false, length = 20)
    private String language;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonBackReference
    @JoinColumn(name = "course_code", insertable = false, updatable = false)
    private Course course;
}