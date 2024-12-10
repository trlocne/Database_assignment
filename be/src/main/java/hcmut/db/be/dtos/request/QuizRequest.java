package hcmut.db.be.dtos.request;

import hcmut.db.be.entity.course.Question;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
public class QuizRequest {
    private String code;
    private String title;
    private int homeworkTime;
    private BigDecimal passScore;
    List<QuestionRequest> questions;
}
