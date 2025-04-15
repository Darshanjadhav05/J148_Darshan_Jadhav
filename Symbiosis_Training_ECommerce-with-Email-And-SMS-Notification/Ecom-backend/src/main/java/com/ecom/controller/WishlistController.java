package com.ecom.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.ecom.entity.Product;
import com.ecom.service.WishlistService;

@CrossOrigin(origins = "http://localhost:4200", allowCredentials = "true")
@RestController
@RequestMapping("/api/wishlist")
public class WishlistController {
    
    @Autowired
    private WishlistService wishlistService;

    @PostMapping("/add/{productId}")
    public ResponseEntity<?> addItem(@PathVariable Integer productId) {
        wishlistService.addToWishlist(productId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/remove/{productId}")
    public ResponseEntity<?> removeItem(@PathVariable int productId) {
        wishlistService.removeFromWishlist(productId);
        return ResponseEntity.ok().build();
    }
    
    @GetMapping("/items")
    public ResponseEntity<List<Product>> getItems() {
        return ResponseEntity.ok(wishlistService.getWishlistItems());
    }

    @PostMapping("/move-to-cart/{productId}")
    public ResponseEntity<?> moveToCart(@PathVariable Long productId) {
        wishlistService.moveToCart(productId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/clear")
    public ResponseEntity<?> clearWishlist() {
        wishlistService.clearWishlist();
        return ResponseEntity.ok().build();
    }
}
