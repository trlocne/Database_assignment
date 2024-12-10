package hcmut.db.be.service;

import hcmut.db.be.config.jwt.JwtUtils;
import hcmut.db.be.dtos.request.LoginRequest;
import hcmut.db.be.dtos.request.SignupRequest;
import hcmut.db.be.dtos.response.ApiResponse;
import hcmut.db.be.dtos.response.LoginResponse;
import hcmut.db.be.entity.Admin;
import hcmut.db.be.entity.Learner;
import hcmut.db.be.entity.Teacher;
import hcmut.db.be.entity.User;
import hcmut.db.be.repository.AdminRepository;
import hcmut.db.be.repository.LearnerRepository;
import hcmut.db.be.repository.TeacherRepository;
import hcmut.db.be.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AuthService {
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private AdminRepository adminRepository;
    @Autowired
    private TeacherRepository teacherRepository;
    @Autowired
    private LearnerRepository learnerRepository;

    public ApiResponse<?> login(LoginRequest request) {
        Authentication authentication;
        try {
            authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
        }catch (AuthenticationException e) {
            return new ApiResponse<>(400, e.getMessage(), null);
        }

        // set authentication
        SecurityContextHolder.getContext().setAuthentication(authentication);

        // specific to our implementation
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();

        String jwtToken = jwtUtils.generateTokenFromUsername(userDetails);

        // collect roles form the UserDetails
        List<String> roles = userDetails.getAuthorities().stream().map(GrantedAuthority::getAuthority).toList();

        // prepare the response body, now including the jwt token directly in the body
        LoginResponse response = new LoginResponse(userDetails.getUsername(), jwtToken, roles.get(0));
        return new ApiResponse<>(200, "success", response);
    }

    public ApiResponse<?> signup(SignupRequest request) {
        // check unique of request
        if(userRepository.existsByUsername(request.getUsername())) {
            throw new RuntimeException("Username already exists");
        }

        // create new user
        User user = User.builder()
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                .fullName(request.getFullName())
                .gender(request.getGender()).build();
        userRepository.save(user);
        Integer userId = userRepository.findUserIdByUsername(request.getUsername());
        // check role
        if("ADMIN".equals(request.getRole())){
            adminRepository.save(Admin.builder().user(user).build());
        }else if("TEACHER".equals(request.getRole())){
            teacherRepository.save(Teacher.builder().user(user).build());
        }else if("LEARNER".equals(request.getRole())){
            learnerRepository.save(Learner.builder().user(user).build());
        }else{
            throw new RuntimeException("Invalid role");
        }
        return new ApiResponse<>(200, "Register successfully", null);
    }
}
