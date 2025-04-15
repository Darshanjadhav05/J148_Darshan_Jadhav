package com.ecom.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import com.ecom.entity.User;
import com.ecom.service.UserService;
import javax.annotation.PostConstruct;

@RestController
@RequestMapping  // Base path for all user-related endpoints
public class UserController {

    @Autowired
    private UserService userService;

    @PostConstruct
    public void initRoleAndUser() {
        userService.initRoleAndUser();
    }

    @PostMapping("/registerNewUser")
    public ResponseEntity<?> registerNewUser(@RequestBody User user) {
        try {
            User registeredUser = userService.registerNewUser(user);
            return ResponseEntity.ok(registeredUser);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/admin")
    @PreAuthorize("hasRole('Admin')")
    public String adminEndpoint() {
        return "Admin Dashboard - This URL is only accessible to administrators";
    }

    @GetMapping("/user")
    @PreAuthorize("hasRole('User')")
    public String userEndpoint() {
        return "User Dashboard - This URL is only accessible to authenticated users";
    }

    // Additional endpoint for checking email availability
    @GetMapping("/checkEmail")
    public ResponseEntity<?> checkEmailAvailability(@RequestParam String email) {
        boolean exists = userService.existsByUserEmail(email);
        return ResponseEntity.ok().body(!exists); // Returns true if email is available
    }

    // Additional endpoint for checking username availability
    @GetMapping("/checkUsername")
    public ResponseEntity<?> checkUsernameAvailability(@RequestParam String username) {
        boolean exists = userService.existsByUserName(username);
        return ResponseEntity.ok().body(!exists); // Returns true if username is available
    }
}