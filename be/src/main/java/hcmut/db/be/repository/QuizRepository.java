package hcmut.db.be.repository;

import hcmut.db.be.entity.course.Quiz;
import hcmut.db.be.entity.course.QuizId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuizRepository extends JpaRepository<Quiz, QuizId> {
}
