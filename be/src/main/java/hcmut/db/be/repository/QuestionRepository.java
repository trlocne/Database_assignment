package hcmut.db.be.repository;

import hcmut.db.be.entity.course.Question;
import hcmut.db.be.entity.course.QuestionId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionRepository extends JpaRepository<Question, QuestionId> {
}
