package com.ecom.service;


import com.ecom.exception.AlreadyExistsException;
import com.ecom.exception.ResourceNotFoundException;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecom.dao.ProductDao;
import com.ecom.dao.WishlistRepository;
import com.ecom.entity.Product;
import com.ecom.entity.User;
import com.ecom.entity.WishlistItem;

@Service
@Transactional
public class WishlistService {
    
    @Autowired
    private WishlistRepository wishlistRepo;
    
    @Autowired
    private ProductDao productRepo;
    
    @Autowired
    private UserService userService;

    public void addToWishlist(Integer productId) {
        User user = userService.getCurrentUser();
        Product product = productRepo.findById(productId)
            .orElseThrow(() -> new ResourceNotFoundException("Product not found with ID: " + productId));

        if (wishlistRepo.existsByUserAndProduct(user, product)) {
            throw new AlreadyExistsException("Product already in wishlist");
        }

        wishlistRepo.save(new WishlistItem(user, product));
    }

    public void removeFromWishlist(int i) {
        User user = userService.getCurrentUser();
        Product product = productRepo.findById(i)
            .orElseThrow(() -> new ResourceNotFoundException("Product not found with ID: " + i));

        wishlistRepo.deleteByUserAndProduct(user, product);
    }

    public List<Product> getWishlistItems() {
        User user = userService.getCurrentUser();
        return wishlistRepo.findProductsByUser(user);
    }

    public void moveToCart(Long productId) {
        // Remove from wishlist
        this.removeFromWishlist(productId.intValue());

        // Add to cart (optional: call cartService.addToCart(productId));
    }

    public void clearWishlist() {
        User user = userService.getCurrentUser();
        wishlistRepo.deleteAllByUser(user);
    }

}