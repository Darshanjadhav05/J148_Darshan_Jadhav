package com.ecom.dao;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.ecom.entity.User;

@Repository
public interface UserDao extends CrudRepository<User, String> {
	  Optional<User> findByUserEmail(String userEmail);
	    
	    // Add method to check if email exists
	    boolean existsByUserEmail(String userEmail);
	    
	    // Add method to check if username exists
	    boolean existsByUserName(String userName);
}
