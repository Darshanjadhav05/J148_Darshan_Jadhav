package com.ecom.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ecom.dao.RoleDao;
import com.ecom.dao.UserDao;
import com.ecom.entity.Role;
import com.ecom.entity.User;
import com.ecom.exception.UsernameNotFoundException;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service
public class UserService {

    @Autowired
    private UserDao userDao;

    @Autowired
    private RoleDao roleDao;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public void initRoleAndUser() {
        // Initialize roles (unchanged)
        Role adminRole = new Role();
        adminRole.setRoleName("Admin");
        adminRole.setRoleDescription("Admin role");
        roleDao.save(adminRole);

        Role userRole = new Role();
        userRole.setRoleName("User");
        userRole.setRoleDescription("Default role for newly created record");
        roleDao.save(userRole);

        // Uncomment and update if you want to create initial users
     
//        User adminUser = new User();
//        adminUser.setUserName("darshan@admin");
//        adminUser.setUserEmail("darshanmjadhav5@gmail.com");
//        adminUser.setUserPassword(getEncodedPassword("admin123"));
//        adminUser.setUserFirstName("Admin");
//        adminUser.setUserLastName("User");
//        Set<Role> adminRoles = new HashSet<>();
//        adminRoles.add(adminRole);
//        adminUser.setRole(adminRoles);
//        userDao.save(adminUser);
//      
    }

    @Transactional
    public User registerNewUser(User user) {
        // 1. Check if username already exists
        if (userDao.existsById(user.getUserName())) {
            throw new RuntimeException("Username already exists");
        }

        // 2. Check if email already exists
        if (userDao.existsByUserEmail(user.getUserEmail())) {
            throw new RuntimeException("Email already in use");
        }

        // 3. Get the default "User" role
        Role role = roleDao.findById("User")
                .orElseThrow(() -> new RuntimeException("Default 'User' role not found"));

        // 4. Encode password first
        user.setUserPassword(getEncodedPassword(user.getUserPassword()));

        // 5. Create a new HashSet for roles (don't reuse collections)
        Set<Role> roles = new HashSet<>();
        roles.add(role);
        user.setRole(roles);

        // 6. Save the user (this will cascade to user_role table)
        User savedUser = userDao.save(user);

       

        return savedUser;
    }
    public String getEncodedPassword(String password) {
        return passwordEncoder.encode(password);
    }

    // Additional method to find user by email
    public User findByEmail(String email) {
        return userDao.findByUserEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found with email: " + email));
    }
    public boolean existsByUserEmail(String email) {
        return userDao.existsByUserEmail(email);
    }

    public boolean existsByUserName(String username) {
        return userDao.existsById(username); // Or userDao.existsByUserName if you added that
    }
    public User getCurrentUser() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return userDao.findById(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));
    }
}