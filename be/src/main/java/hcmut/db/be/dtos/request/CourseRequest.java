package hcmut.db.be.dtos.request;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
public class CourseRequest {
    private String code;
    private String name;
    private String title;
    private int duration;
    private String status;
    private BigDecimal rating;
    private String description;
    private String requirement;
    private MultipartFile thumbnail;
    private String price;
    private String category;
    private List<String> language;
}
