package hcmut.db.be.repository;

import hcmut.db.be.entity.course.Lecture;
import hcmut.db.be.entity.course.LectureId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LectureRepository extends JpaRepository<Lecture, LectureId> {
}
