package hcmut.db.be.controller;

import hcmut.db.be.dtos.request.*;
import hcmut.db.be.dtos.response.ApiResponse;
import hcmut.db.be.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;

@RestController
@RequestMapping("/api/courses")
public class CourseController {

    @Autowired
    private CourseService courseService;

    @PostMapping(value = "/create", consumes = {"multipart/form-data"})
    @PreAuthorize("hasRole('ROLE_TEACHER')")
    public ResponseEntity<?> createCourse(@ModelAttribute CourseRequest request) {
        try {
            return ResponseEntity.ok(courseService.createCourse(request));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ApiResponse<>(400, e.getMessage(), null));
        }
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateCourse(@ModelAttribute CourseRequest request) {
        try {
            return ResponseEntity.ok(courseService.updateCourse(request));
        }catch (Exception e){
            return ResponseEntity.badRequest().body(new ApiResponse<>(400, e.getMessage(), null));
        }
    }

    @DeleteMapping("/{code}")
    public ResponseEntity<?> deleteCourse(@PathVariable String code) {
        try {
            return ResponseEntity.ok(courseService.deleteCourse(code));
        }catch (Exception e){
            return ResponseEntity.badRequest().body(new ApiResponse<>(400, e.getMessage(), null));
        }
    }

    @PostMapping("/{code}/signed-course")
    public ResponseEntity<?> signedCourse(@PathVariable String code) {
        try {
            return ResponseEntity.ok(courseService.signedCourse(code));
        }catch (Exception e){
            return ResponseEntity.badRequest().body(new ApiResponse<>(400, e.getMessage(), null));
        }
    }

    @GetMapping("")
    public ResponseEntity<?> getAllCourses(@RequestParam(defaultValue = "0") Boolean searchFlag,
                                           @RequestParam(required = false) String teacherName,
                                           @RequestParam(required = false) String title,
                                           @RequestParam(required = false) BigDecimal rating) {
        try {
            if (searchFlag==Boolean.TRUE) {
                return ResponseEntity.ok(courseService.getFilterDBMS(teacherName, title, rating));
            }
            return ResponseEntity.ok(courseService.getAll());
        }catch (Exception e) {
            return ResponseEntity.badRequest().body(new ApiResponse<>(400, e.getMessage(), null));
        }
    }

//    @GetMapping("")
//    public ResponseEntity<?> getAllCourses(@RequestParam(defaultValue = "0") Boolean searchFlag,
//                                           @RequestParam(required = false) String status,
//                                           @RequestParam(required = false) String teacherName,
//                                           @RequestParam(required = false) String title,
//                                           @RequestParam(required = false) BigDecimal rating){
//        try {
//            if (searchFlag==Boolean.TRUE) {
//                return ResponseEntity.ok(courseService.getFilterDBMS(teacherName, status, title, rating));
//            }
//            return ResponseEntity.ok(courseService.getAll());
//        }catch (Exception e) {
//            return ResponseEntity.badRequest().body(new ApiResponse<>(400, e.getMessage(), null));
//        }
//    }

    @GetMapping("/{code}")
    public ResponseEntity<?> getCourseByCode(@PathVariable String code) {
        try {
            return ResponseEntity.ok(courseService.getCourseDetails(code));
        }catch (Exception e) {
            return ResponseEntity.badRequest().body(new ApiResponse<>(400, e.getMessage(), null));
        }
    }

    @PostMapping("/{code}/review")
    public ResponseEntity<?> reviewCourse(@PathVariable String code, @RequestBody ReviewRequest request) {
        try {
            return ResponseEntity.ok(courseService.reviewCourse(request, code));
        }catch (Exception e) {
            return ResponseEntity.badRequest().body(new ApiResponse<>(400, e.getMessage(), null));
        }
    }

    @PostMapping("/{code}/sections")
    public ResponseEntity<?> createSection(@PathVariable String code, @RequestBody SectionRequest request) {
        try {
            return ResponseEntity.ok(courseService.createSection(request, code));
        }catch (Exception e) {
            return ResponseEntity.badRequest().body(new ApiResponse<>(400, e.getMessage(), null));
        }
    }

    @PostMapping("/{code}/sections/{chapter}/lectures")
    public ResponseEntity<?> createLecture(@PathVariable String code, @PathVariable int chapter, @RequestBody LectureRequest request) {
        try {
            return ResponseEntity.ok(courseService.createLecture(request, code, chapter));
        }catch (Exception e){
            return ResponseEntity.badRequest().body(new ApiResponse<>(400, e.getMessage(), null));
        }
    }

    @PostMapping("/{code}/sections/{chapter}/quizzes")
    public ResponseEntity<?> createQuiz(@PathVariable String code, @PathVariable int chapter, @RequestBody QuizRequest request) {
        try {
            return ResponseEntity.ok(courseService.createQuiz(request, code, chapter));
        }catch (Exception e){
            return ResponseEntity.badRequest().body(new ApiResponse<>(400, e.getMessage(), null));
        }
    }

    @GetMapping("/{code}/video")
    public ResponseEntity<?> getVideo(@PathVariable String code) {
        try {
            return ResponseEntity.ok(courseService.getVideo(code));
        }catch (Exception e) {
            return ResponseEntity.badRequest().body(new ApiResponse<>(400, e.getMessage(), null));
        }
    }

    @GetMapping("/teacher")
    @PreAuthorize("hasRole('ROLE_TEACHER')")
    public ResponseEntity<?> getCourseByTeacher() {
        try {
            return ResponseEntity.ok(courseService.findCoursesByTeacher());
        }catch (Exception e) {
            return ResponseEntity.badRequest().body(new ApiResponse<>(400, e.getMessage(), null));
        }
    }

}
