package hcmut.db.be.repository;

import hcmut.db.be.entity.course.SignedCourse;
import hcmut.db.be.entity.course.SignedCourseId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SignedCourseRepository extends JpaRepository<SignedCourse, SignedCourseId> {
}
