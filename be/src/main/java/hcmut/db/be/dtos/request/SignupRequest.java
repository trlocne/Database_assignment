package hcmut.db.be.dtos.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SignupRequest {
    private String username;
    private String password;
    private String fullName;
    private Character gender;
    private String role;
}
