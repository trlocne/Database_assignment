package hcmut.db.be.dtos.response;

import hcmut.db.be.entity.comment.CommentSignedCourse;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReviewCourseResponse {
    private String leanerName;
    private String date;
    private String content;

    public static ReviewCourseResponse toReviewCourseResponse(CommentSignedCourse commentSignedCourse) {
        return ReviewCourseResponse.builder()
                .leanerName(commentSignedCourse.getSignedCourse().getLearner().getUser().getFullName())
                .date(commentSignedCourse.getId().getDate().toString())
                .content(commentSignedCourse.getContent())
                .build();
    }
}
