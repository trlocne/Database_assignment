package hcmut.db.be.dtos.response;

import hcmut.db.be.entity.course.Quiz;
import hcmut.db.be.entity.course.Section;
import hcmut.db.be.entity.course.SectionId;
import lombok.*;

import java.security.Key;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SectionResponse {
    private int chapter;
    private String sectionTitle;
    private int amountOfTime;
    private int numberOfLecture;
    List<Map<String, Object>> lectures;
    List<Map<String, Object>> quizzes;

    public static SectionResponse toSectionResponse(Section section) {
        // handle lecture
        List<Map<String, Object>> lectures = section.getLectures().stream()
                .map(lecture -> {
                    Map<String, Object> lectureMap = new HashMap<>();
                    lectureMap.put("number", lecture.getId().getNumber());
                    lectureMap.put("lectureName", lecture.getName());
                    lectureMap.put("timeOfLecture", lecture.getTimeOfLecture());
                    lectureMap.put("lectureStatus", lecture.getStatus());
                    return lectureMap; // Trả về Map
                })
                .toList(); // Thu kết quả vào List

        // handle quizzes
        List<Map<String, Object>> quizzes = section.getQuizzes().stream()
                .map(quiz -> {
                    Map<String, Object> quizMap = new HashMap<>();
                    quizMap.put("code", quiz.getId().getCode());
                    quizMap.put("title", quiz.getTitle());
                    quizMap.put("homeworkTime", quiz.getHomeworkTime());
                    return quizMap;
                }).toList();

        return SectionResponse.builder()
                .chapter(section.getId().getChapter())
                .sectionTitle(section.getTitle())
                .amountOfTime(section.getAmountOfTime())
                .numberOfLecture(section.getNumberOfLecture())
                .lectures(lectures)
                .quizzes(quizzes)
                .build();
    }

    public static SectionResponse fromSection(Section section) {
        // handle lecture
        List<Map<String, Object>> lectures = section.getLectures().stream()
                .map(lecture -> {
                    Map<String, Object> lectureMap = new HashMap<>();
                    lectureMap.put("number", lecture.getId().getNumber());
                    lectureMap.put("lectureName", lecture.getName());
                    lectureMap.put("timeOfLecture", lecture.getTimeOfLecture());
                    lectureMap.put("lectureStatus", lecture.getStatus());
                    lectureMap.put("video", lecture.getVideo());
                    return lectureMap; // Trả về Map
                })
                .toList(); // Thu kết quả vào List

        // handle quizzes
        for(Quiz quiz : section.getQuizzes()){
            System.out.println(quiz.getQuestions().stream().map(QuestionResponse::toQuestionResponse).toList());
        }
        List<Map<String, Object>> quizzes = section.getQuizzes().stream()
                .map(quiz -> {
                    Map<String, Object> quizMap = new HashMap<>();
                    quizMap.put("code", quiz.getId().getCode());
                    quizMap.put("title", quiz.getTitle());
                    quizMap.put("homeworkTime", quiz.getHomeworkTime());
                    quizMap.put("questions", quiz.getQuestions().stream().map(QuestionResponse::toQuestionResponse).toList());
                    return quizMap;
                }).toList();

        return SectionResponse.builder()
                .chapter(section.getId().getChapter())
                .sectionTitle(section.getTitle())
                .amountOfTime(section.getAmountOfTime())
                .numberOfLecture(section.getNumberOfLecture())
                .lectures(lectures)
                .quizzes(quizzes)
                .build();
    }
}
