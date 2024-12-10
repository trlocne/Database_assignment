package hcmut.db.be.dtos.response;

import hcmut.db.be.entity.course.Question;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class QuestionResponse {
    private String questionCode;
    private String content;
    private String answers;
    private String questionType;

    public static QuestionResponse toQuestionResponse(Question question) {
        return QuestionResponse.builder()
                .questionCode(question.getId().getQuestionCode())
                .content(question.getContent())
                .answers(question.getAnswer())
                .questionType(question.getType())
                .build();
    }
}
