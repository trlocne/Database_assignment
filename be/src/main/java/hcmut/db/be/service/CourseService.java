package hcmut.db.be.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import hcmut.db.be.dtos.request.*;
import hcmut.db.be.dtos.response.*;
import hcmut.db.be.entity.comment.CommentSignedCourse;
import hcmut.db.be.entity.comment.CommentSignedCourseId;
import hcmut.db.be.entity.course.*;
import hcmut.db.be.repository.*;
import hcmut.db.be.utils.AuthUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.filter.RequestContextFilter;

import java.io.IOException;
import java.math.BigDecimal;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class CourseService {
    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private LanguageRepository languageRepository;

    @Autowired
    private SectionRepository sectionRepository;

    @Autowired
    private LectureRepository lectureRepository;

    @Autowired
    private QuizRepository quizRepository;

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private AuthUtil authUtil;

    @Autowired
    private Cloudinary cloudinary;

    @Autowired
    private SignedCourseRepository signedCourseRepository;
    @Autowired
    private RequestContextFilter requestContextFilter;

    public ApiResponse<?> createCourse(CourseRequest request) throws IOException {
        if(authUtil.loggedInUser().getTeacher()==null) throw new RuntimeException("Unauthorized");
        // check code
        if(courseRepository.existsByCode(request.getCode())){
            throw new RuntimeException("Course code already exists");
        }
        Map uploadResult = cloudinary.uploader().upload(request.getThumbnail().getBytes(), ObjectUtils.emptyMap());

        String fileUrl = uploadResult.get("secure_url").toString();

        courseRepository.insertCourse(request.getCode(), request.getName(), request.getTitle(), request.getDuration(), request.getStatus(), request.getRating(), request.getDescription(), request.getRequirement(), fileUrl, request.getPrice(), 0, authUtil.loggedInUserId(), request.getCategory());
        for(String language : request.getLanguage()){
            languageRepository.insertLanguage(request.getCode(), language);
        }
        return new ApiResponse<>(200, "Course has been created success", null);
    }

    public ApiResponse<?> getAllCourses(String category, String teacherName, String requirement){
        List<CourseResponse> courseResponses = courseRepository.findCoursesWithFilter(category, teacherName, requirement).stream().map(CourseResponse::toCourseResponse).toList();
        return new ApiResponse<>(200, "success", courseResponses);
    }

    public ApiResponse<?> getFilterDBMS(String teacherName, String status, String title, BigDecimal rating){
        List<CourseResponse> courseResponses = courseRepository.findCourseWithFilterDB(teacherName, status, title, rating).stream().map(CourseResponse::toCourseResponse).toList();
        return new ApiResponse<>(200, "success", courseResponses);
    }

    public ApiResponse<?> getAll(){
        List<CourseResponse> courseResponses = courseRepository.findAll().stream().map(CourseResponse::toCourseResponse).toList();
        return new ApiResponse<>(200, "success", courseResponses);
    }

    public ApiResponse<?> getCourseDetails(String courseCode){
        Course course = courseRepository.findById(courseCode)
                .orElseThrow(() -> new RuntimeException("Course not found for code: " + courseCode));

        // get list signed with this course
        List<SignedCourse> signedCourses = course.getSignedCourses();
        List<ReviewCourseResponse> reviewCourseResponses = new ArrayList<>();
        for(SignedCourse signedCourse : signedCourses){
            reviewCourseResponses.addAll(signedCourse.getComments().stream().map(ReviewCourseResponse::toReviewCourseResponse).toList());
        }
        List<SectionResponse> sectionResponses = course.getSections().stream().map(SectionResponse::toSectionResponse).toList();
        CourseDetailResponse courseDetailResponse = CourseDetailResponse.builder()
                .courseOverview(CourseResponse.toCourseResponse(course))
                .courseContent(new CourseContentResponse(sectionResponses))
                .reviewCourses(reviewCourseResponses).build();
        return ApiResponse.builder()
                .status(200)
                .message("Success")
                .data(courseDetailResponse).build();
    }

    public ApiResponse<?> createSection(SectionRequest request, String courseCode){
        if(!courseRepository.existsByCode(courseCode)) throw new RuntimeException("Course code does not exist");
        Section section = Section.builder()
                .id(new SectionId(courseCode, request.getChapter()))
                .title(request.getTitle())
                .amountOfTime(0)
                .numberOfLecture(0).build();

        // save section into database
        sectionRepository.save(section);
        return new ApiResponse<>(200, "Section has been created success", null);
    }

    public ApiResponse<?> createLecture(LectureRequest request, String courseCode, int chapter){
        if(!courseRepository.existsByCode(courseCode)) throw new RuntimeException("Course code does not exist");
        if(!sectionRepository.existsById(new SectionId(courseCode, chapter))) throw new RuntimeException("Section does not exist");
        Lecture lecture = Lecture.builder()
                .id(new LectureId(courseCode, chapter, request.getNumber()))
                .name(request.getLectureName())
                .video(request.getVideoUrl())
                .timeOfLecture(request.getTimeOfLecture())
                .status("T")
                .build();
        lectureRepository.save(lecture);
        return new ApiResponse<>(200, "Lecture has been created success", null);
    }

    public ApiResponse<?> createQuiz(QuizRequest request, String courseCode, int chapter){
        if(!courseRepository.existsByCode(courseCode)) throw new RuntimeException("Course code does not exist");
        if(!sectionRepository.existsById(new SectionId(courseCode, chapter))) throw new RuntimeException("Section does not exist");

        Quiz quiz = Quiz.builder()
                .id(new QuizId(courseCode, chapter, request.getCode()))
                .title(request.getTitle())
                .homeworkTime(request.getHomeworkTime())
                .passScore(request.getPassScore())
                .build();
        quizRepository.save(quiz);

        // tao question
        for (QuestionRequest questionRequest : request.getQuestions()){
            Question question = Question.builder()
                    .id(new QuestionId(courseCode, chapter, request.getCode(), questionRequest.getQuestionCode()))
                    .content(questionRequest.getContent())
                    .answer(questionRequest.getAnswers())
                    .type(questionRequest.getQuestionType())
                    .build();
            // save question
            questionRepository.save(question);
        }
        return new ApiResponse<>(200, "Quiz has been created success", null);
    }

    // update course
    public ApiResponse<?> updateCourse(CourseRequest request){
        Course course = courseRepository.findById(request.getCode()).orElseThrow(() -> new RuntimeException("Course not found for code: " + request.getCode()));
        // set new data
        courseRepository.updateCourse(request.getCode(), request.getName(), request.getTitle(), request.getDuration(), request.getStatus(), request.getRating(), request.getDescription(), request.getRequirement(), course.getThumbnail(), request.getPrice(), 0, course.getTeacher().getId(), request.getCategory());
        for(String language : request.getLanguage()){
            languageRepository.updateLanguage(request.getCode(), language);
        }
        return new ApiResponse<>(200, "Course has been updated success", null);
    }

    public ApiResponse<?> deleteCourse(String courseCode){
        if(!courseRepository.existsByCode(courseCode)) throw new RuntimeException("Course code does not exist");
        courseRepository.deleteById(courseCode);
        return new ApiResponse<>(200, "Course has been deleted success", null);
    }

    // sign course
    public ApiResponse<?> signedCourse(String courseCode){
        if(!courseRepository.existsByCode(courseCode)) throw new RuntimeException("Course code does not exist");
        if(signedCourseRepository.existsById(new SignedCourseId(authUtil.loggedInUserId(), courseCode))) throw new RuntimeException("SignedCourse already exists");

        SignedCourse signedCourse = SignedCourse.builder()
                .id(new SignedCourseId(authUtil.loggedInUserId(), courseCode))
                .build();
        signedCourseRepository.save(signedCourse);
        return new ApiResponse<>(200, "Course has been signed success", null);
    }

    // comment and rating
    public ApiResponse<?> reviewCourse(ReviewRequest request, String courseCode){
        if(!courseRepository.existsByCode(courseCode)) throw new RuntimeException("Course code does not exist");
        SignedCourse signedCourse = signedCourseRepository.findById(new SignedCourseId(authUtil.loggedInUserId(), courseCode)).orElseThrow(() -> new RuntimeException("Course not signed with user"));
        // rating
        signedCourse.setRating(request.getRating());
        signedCourse.getComments().add(CommentSignedCourse.builder()
                .id(new CommentSignedCourseId(authUtil.loggedInUserId(), courseCode, LocalDate.now()))
                .content(request.getComment())
                .build());
        signedCourseRepository.save(signedCourse);
        return new ApiResponse<>(200, "Course has been reviewed success", null);
    }

    // get video of course
    public ApiResponse<?> getVideo(String courseCode){
        Course course = courseRepository.findById(courseCode)
                .orElseThrow(() -> new RuntimeException("Course not found for code: " + courseCode));

        // get list signed with this course
        List<SignedCourse> signedCourses = course.getSignedCourses();
        List<SectionResponse> sectionResponses = course.getSections().stream().map(SectionResponse::fromSection).toList();
        CourseDetailResponse courseDetailResponse = CourseDetailResponse.builder()
                .courseOverview(CourseResponse.toCourseResponse(course))
                .courseContent(new CourseContentResponse(sectionResponses))
                .build();
        return ApiResponse.builder()
                .status(200)
                .message("Success")
                .data(courseDetailResponse).build();
    }
}
