package hcmut.db.be.repository;

import hcmut.db.be.entity.course.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.util.List;

public interface CourseRepository extends JpaRepository<Course, String> {
    boolean existsByCode(String code);
    @Procedure(procedureName = "InsertCourse")
    void insertCourse(@Param("code") String code,
                      @Param("name") String name,
                      @Param("title") String title,
                      @Param("duration") int duration,
                      @Param("status") String status,
                      @Param("rating") BigDecimal rating,
                      @Param("description") String description,
                      @Param("requirement") String requirement,
                      @Param("thumbnail") String thumbnail,
                      @Param("price") String price,
                      @Param("number_of_learner") Integer numberOfLearner,
                      @Param("teacher_id") Integer teacherId,
                      @Param("category") String category);

    @Procedure(procedureName = "GetCoursesByTitleAndRating")
    List<Course> findCourseWithFilterDB(
            @Param("TeacherName") String teacherName,
            @Param("Title") String title,
            @Param("Rating") BigDecimal rating
    );

    @Query("SELECT c FROM Course c " +
            "JOIN c.teacher t " +
            "JOIN t.user u " +
            "WHERE (:category IS NULL OR c.category = :category) " +
            "AND (:teacherName IS NULL OR u.fullName LIKE %:teacherName%) " +
            "AND (:requirement IS NULL OR c.requirement LIKE %:requirement%)")
    List<Course> findCoursesWithFilter(
            @Param("category") String category,
            @Param("teacherName") String teacherName,
            @Param("requirement") String requirement
    );

    @Procedure(procedureName = "UpdateCourse")
    void updateCourse(
            @Param("Course_Code") String courseCode,
            @Param("Name") String name,
            @Param("Title") String title,
            @Param("Duration") int duration,
            @Param("Status") String status,
            @Param("Rating") BigDecimal rating,
            @Param("Description") String description,
            @Param("Requirement") String requirement,
            @Param("Thumbnail") String thumbnail,
            @Param("Price") String price,
            @Param("Number_Of_Learner") int numberOfLearner,
            @Param("Teacher_ID") int teacherId,
            @Param("Category") String category
    );

    @Query(value = "select c from Course c " +
            "JOIN c.teacher t " +
            "WHERE t.id = :teacherId")
    List<Course> findCoursesByTeacherId(@Param("teacherId") Integer teacherId);

    @Procedure(procedureName = "DeleteCourse")
    void deleteByCode(
            @Param("Course_Code") String courseCode
    );
}
