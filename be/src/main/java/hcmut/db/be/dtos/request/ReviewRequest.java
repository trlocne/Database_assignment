package hcmut.db.be.dtos.request;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Setter
@Getter
public class ReviewRequest {
    private String comment;
    private BigDecimal rating;
}
