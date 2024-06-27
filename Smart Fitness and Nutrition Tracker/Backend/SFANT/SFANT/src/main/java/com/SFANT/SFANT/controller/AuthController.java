package com.SFANT.SFANT.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.SFANT.SFANT.model.LoginRequest;
import com.SFANT.SFANT.model.User;
import com.SFANT.SFANT.repository.UserRepository;
import com.SFANT.SFANT.services.AuthenticationService;
import com.SFANT.SFANT.services.UserService;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

     @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        User currUser = userRepository.findByEmail(user.getEmail());
        if (currUser != null) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Email is already in use");
        }

        // Encrypt the password before saving the user
        // user.setPassword(passwordEncoder.encode(user.getPassword()));

        User savedUser = userService.saveUser(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
    }

    @Autowired
    private AuthenticationService authService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try {
            User user = authService.authenticate(loginRequest.getEmail(), loginRequest.getPassword());

             User userResponse = new User(user.getId(), user.getFirstName(), user.getLastName(), user.getEmail());
            
            return ResponseEntity.ok(userResponse);
        } catch (IllegalArgumentException e) {
            String errorMessage = e.getMessage();
            if ("User not found".equals(errorMessage)) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorMessage);
            } else if ("Invalid password".equals(errorMessage)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorMessage);
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("An error occurred");
            }
        }
}
}