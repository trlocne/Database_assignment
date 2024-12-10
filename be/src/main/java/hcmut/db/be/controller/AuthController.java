package hcmut.db.be.controller;

import hcmut.db.be.dtos.request.LoginRequest;
import hcmut.db.be.dtos.request.SignupRequest;
import hcmut.db.be.dtos.response.ApiResponse;
import hcmut.db.be.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/auth")
public class AuthController {
    @Autowired
    private AuthService authService;

    @PostMapping("/public/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request){
        try {
            return ResponseEntity.ok(authService.login(request));
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/public/signup")
    public ResponseEntity<?> signup(@RequestBody SignupRequest request){
        try {
            return ResponseEntity.ok(authService.signup(request));
        }catch (Exception e){
            return ResponseEntity.badRequest().body(new ApiResponse<>(400, e.getMessage(), null));
        }
    }
}
