package hcmut.db.be.dtos.response;

import hcmut.db.be.entity.course.Course;
import hcmut.db.be.entity.course.Language;
import hcmut.db.be.entity.course.Section;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class CourseResponse {
    private String code;
    private String name;
    private String title;
    private int duration;
    private String status;
    private BigDecimal rating;
    private String description;
    private String requirement;
    private String thumbnail;
    private String price;
    private Integer numberOfLearner;  // Nullable field
    private String teacherName;  // Assuming you have a Teacher entity
    private String category;
    private int numberOfLessons;
    private List<String> languages;

    public static CourseResponse toCourseResponse(Course course) {
        int numberLessons = 0;
        for(Section section : course.getSections()) {
            numberLessons+=section.getNumberOfLecture();
        }
        return CourseResponse.builder()
                .code(course.getCode())
                .name(course.getName())
                .title(course.getTitle())
                .duration(course.getDuration())
                .status(course.getStatus())
                .rating(course.getRating())
                .description(course.getDescription())
                .requirement(course.getRequirement())
                .thumbnail(course.getThumbnail())
                .price(course.getPrice())
                .numberOfLearner(course.getNumberOfLearner())
                .teacherName(course.getTeacher().getUser().getFullName())
                .category(course.getCategory())
                .numberOfLessons(numberLessons)
                .languages(course.getLanguages().stream().map(Language::getLanguage).toList())
                .build();
    }
}
