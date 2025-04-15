package com.ecom.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ecom.entity.Product;
import com.ecom.entity.User;
import com.ecom.entity.WishlistItem;

@Repository
public interface WishlistRepository extends JpaRepository<WishlistItem, Long> {
    
    boolean existsByUserAndProduct(User user, Product product);
    
    void deleteByUserAndProduct(User user, Product product);
    
    void deleteAllByUser(User user);
    
    @Query("SELECT w.product FROM WishlistItem w WHERE w.user = :user")
    List<Product> findProductsByUser(@Param("user") User user);
    
    @Query("SELECT w.product.id FROM WishlistItem w WHERE w.user = :user")
    List<Long> findProductIdsByUser(@Param("user") User user);
}