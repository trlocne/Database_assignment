package hcmut.db.be.dtos.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LectureRequest {
    private int number;
    private String lectureName;
    private String videoUrl;
    private int timeOfLecture;
}
