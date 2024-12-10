package hcmut.db.be.repository;

import hcmut.db.be.entity.course.Language;
import hcmut.db.be.entity.course.LanguageId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;

public interface LanguageRepository extends JpaRepository<Language, LanguageId> {

    @Procedure(procedureName = "InsertLanguage")
    void insertLanguage(@Param("course_code") String code, @Param("language") String language);

    @Procedure(procedureName = "UpdateLanguage")
    void updateLanguage(@Param("course_code") String code, @Param("language") String language);
}
