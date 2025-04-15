package com.ecom.entity;

import javax.persistence.*;

import java.util.HashSet;
import java.util.Set;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Entity
@Table(name = "user",
uniqueConstraints = {
    @UniqueConstraint(columnNames = "user_name"),
    @UniqueConstraint(columnNames = "user_email")
})

public class User {

    @Id
    @Column(name = "user_name", length = 50)
    private String userName;

    @NotBlank(message = "First name is required")
    @Column(name = "user_first_name", length = 50)
    private String userFirstName;

    @NotBlank(message = "Last name is required")
    @Column(name = "user_last_name", length = 50)
    private String userLastName;

    @NotBlank(message = "Password is required")
    @Column(name = "user_password")
    private String userPassword;

    @NotBlank(message = "Email is required")
    @Email(message = "Email should be valid")
    @Column(name = "user_email", unique = true, length = 100)
    private String userEmail;

    @ManyToMany(fetch = FetchType.EAGER, cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(name = "user_role",
        joinColumns = @JoinColumn(
            name = "user_id", 
            referencedColumnName = "user_name",
            foreignKey = @ForeignKey(name = "FK_USER_ROLE_USER")),
        inverseJoinColumns = @JoinColumn(
            name = "role_id",
            referencedColumnName = "role_name",
            foreignKey = @ForeignKey(name = "FK_USER_ROLE_ROLE"))
    )
    private Set<Role> role;

    // Constructors
    public User() {}

    public User(String userName, String userFirstName, String userLastName, 
               String userPassword, String userEmail,Set<Role> role) {
        this.userName = userName;
        this.userFirstName = userFirstName;
        this.userLastName = userLastName;
        this.userPassword = userPassword;
        this.userEmail = userEmail;
        this.role = role;
    }

    // Getters and Setters
    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getUserFirstName() {
        return userFirstName;
    }

    public void setUserFirstName(String userFirstName) {
        this.userFirstName = userFirstName;
    }

    public String getUserLastName() {
        return userLastName;
    }

    public void setUserLastName(String userLastName) {
        this.userLastName = userLastName;
    }

    public String getUserPassword() {
        return userPassword;
    }

    public void setUserPassword(String userPassword) {
        this.userPassword = userPassword;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public Set<Role> getRole() {
        return role;
    }

    public void setRole(Set<Role> role) {
        this.role = role;
    }
}