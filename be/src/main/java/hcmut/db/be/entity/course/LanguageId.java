package hcmut.db.be.entity.course;

import jakarta.persistence.Column;
import java.io.Serializable;
import java.util.Objects;

public class LanguageId implements Serializable {

    @Column(name = "course_code")
    private String courseCode;

    @Column(name = "language")
    private String language;

    public LanguageId() {
    }

    public LanguageId(String courseCode, String language) {
        this.courseCode = courseCode;
        this.language = language;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        LanguageId that = (LanguageId) o;
        return Objects.equals(courseCode, that.courseCode) &&
                Objects.equals(language, that.language);
    }

    @Override
    public int hashCode() {
        return Objects.hash(courseCode, language);
    }
}
