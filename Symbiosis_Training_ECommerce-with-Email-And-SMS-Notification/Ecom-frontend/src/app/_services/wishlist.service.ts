import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../_model/product.model';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  private baseUrl = 'http://localhost:9090/api/wishlist'; // Update if needed
  private wishlistItems: number[] = [];
  private wishlistSubject = new BehaviorSubject<number[]>([]);
  wishlist$ = this.wishlistSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadWishlist(); // initial load from backend
  }

  loadWishlist(): void {
    this.http.get<Product[]>(`${this.baseUrl}/items`).subscribe((products) => {
      this.wishlistItems = products.map((p) => p.productId).filter((id): id is number => id !== undefined);
      this.wishlistSubject.next(this.wishlistItems);
    });
  }

  toggleItem(productId: number): void {
    if (this.isInWishlist(productId)) {
      this.removeItem(productId);
    } else {
      this.addItem(productId);
    }
  }

  addItem(productId: number): void {
    this.http.post(`${this.baseUrl}/add/${productId}`, {}).subscribe(() => {
      this.wishlistItems.push(productId);
      this.wishlistSubject.next(this.wishlistItems);
    });
  }

  removeItem(productId: number): void {
    this.http.delete(`${this.baseUrl}/remove/${productId}`).subscribe(() => {
      this.wishlistItems = this.wishlistItems.filter((id) => id !== productId);
      this.wishlistSubject.next(this.wishlistItems);
    });
  }

  isInWishlist(productId: number): boolean {
    return this.wishlistItems.includes(productId);
  }

  getWishlist(): number[] {
    return this.wishlistItems;
  }

  clearWishlist(): void {
    this.http.delete(`${this.baseUrl}/clear`).subscribe(() => {
      this.wishlistItems = [];
      this.wishlistSubject.next([]);
    });
  }
}
