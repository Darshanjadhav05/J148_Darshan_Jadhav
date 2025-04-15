package com.ecom.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ecom.entity.Address;
import com.ecom.entity.User;

@Repository
public interface AddressDao extends JpaRepository<Address, Long> {
    List<Address> findByUser(User user);
}
