package hcmut.db.be.dtos.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CourseDetailResponse {
    private CourseResponse courseOverview;
    private CourseContentResponse courseContent;
    private List<ReviewCourseResponse> reviewCourses;
}
