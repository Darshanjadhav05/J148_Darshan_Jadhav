package com.ecom.controller;

import com.ecom.dao.AddressDao;
import com.ecom.entity.Address;
import com.ecom.entity.User;
import com.ecom.configuration.JwtRequestFilter;
import com.ecom.dao.UserDao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/address")
public class AddressController {

    @Autowired
    private AddressDao addressRepository;

    @Autowired
    private UserDao userDao;

    @GetMapping
    public List<Address> getAllAddressesForUser() {
    	System.out.println("requesting address.......");
        String currentUser = JwtRequestFilter.CURRENT_USER;
        User user = userDao.findById(currentUser).orElse(null);

        if (user != null) {
            return addressRepository.findByUser(user);
        }

        return List.of(); // empty list if user not found
    }
    @PostMapping
    public Address saveAddress(@RequestBody Address address) {
        String currentUser = JwtRequestFilter.CURRENT_USER;
        User user = userDao.findById(currentUser).orElse(null);

        if (user != null) {
            address.setUser(user);
            return addressRepository.save(address);
        }
        return null;
    }

}
