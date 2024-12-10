package hcmut.db.be.repository;

import hcmut.db.be.entity.comment.CommentSignedCourse;
import hcmut.db.be.entity.comment.CommentSignedCourseId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentSignedCourseRepository extends JpaRepository<CommentSignedCourse, CommentSignedCourseId> {
}
