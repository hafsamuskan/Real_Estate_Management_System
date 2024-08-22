package com.example.rse.controller;

import com.example.rse.model.User;
import com.example.rse.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import javax.validation.Valid;


@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private UserService userService;


    
    

	  @PostMapping("/login")
	  @CrossOrigin(origins = "http://localhost:3000")
	  public ResponseEntity<?> login(@Valid @RequestBody User user) {
	      Optional<User> existingUser = userService.findByUsername(user.getUsername());
	      if (existingUser.isPresent() && existingUser.get().getPassword().equals(user.getPassword()) && existingUser.get().getRole().equals(user.getRole())) {
	          // Return user details including the role
	          Map<String, Object> response = new HashMap<>();
	          response.put("email", existingUser.get().getUsername());
	          response.put("role", existingUser.get().getRole());
	          return ResponseEntity.ok(response);
	      }
	      return ResponseEntity.status(401).body("Invalid email or password");
	  }
    
    
//    @PostMapping("/login")
//    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
//        return userService.validateUser(loginRequest.getUsername(), loginRequest.getPassword(), loginRequest.getRole())
//            .map(user -> ResponseEntity.ok(new LoginResponse(user.getRole(), user.getName(), "mock-token")))
//            .orElse(ResponseEntity.status(401).body("Invalid email, password, or role"));
//    }
    
    
    @PostMapping("/register")
    @CrossOrigin(origins = "http://localhost:3000") // Replace with your frontend URL
    public ResponseEntity<User> register(@Valid @RequestBody User user) {
        return ResponseEntity.ok(userService.saveUser(user));
    }
    
    
}
