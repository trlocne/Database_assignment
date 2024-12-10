package hcmut.db.be.dtos.request;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class QuestionRequest {
    private String questionCode;
    private String content;
    private String answers;
    private String questionType;
}
