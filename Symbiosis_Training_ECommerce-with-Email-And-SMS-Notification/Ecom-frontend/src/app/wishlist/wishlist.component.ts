import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { WishlistService } from '../_services/wishlist.service';
import { Product } from '../_model/product.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-wishlist',
  imports: [
    MatIconModule,MatCardModule,CommonModule,MatButtonModule
  ],
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  wishlistItems: number[] = [];
  wishlistProducts: any[] = [];

  constructor(
    private wishlistService: WishlistService,
    private productService: ProductService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadWishlist();
  }

  loadWishlist() {
    this.wishlistService.loadWishlist(); // sync list of IDs
    this.wishlistService.wishlist$.subscribe((ids) => {
      this.productService.getProductsByIds(ids).subscribe({
        next: (products: Product[]) => {
          this.wishlistProducts = products;
          console.log(this.wishlistProducts);
          this.wishlistItems = ids;
        },
        error: (err: any) => {
          console.error('Error loading wishlist:', err);
        }
      });
    });
  }
  

  removeFromWishlist(productId: number) {
    this.wishlistService.toggleItem(productId);
    this.loadWishlist();
    this.snackBar.open('Removed from wishlist', 'Close', { duration: 2000 });
  }

  addToCart(productId: number) {
    // Implement your cart logic here
    this.snackBar.open('Added to cart!', 'Close', { duration: 2000 });
  }
}