import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UserAuthService } from '../_services/user-auth.service';
import { UserService } from '../_services/user.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ProductService } from '../_services/product.service';
import { WishlistService } from '../_services/wishlist.service';
import { MatBadgeModule } from '@angular/material/badge';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule,MatBadgeModule, CommonModule, RouterModule ,MatFormFieldModule,MatInputModule,MatButtonModule,MatIconModule,MatMenuModule
  ], 
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  cartCount = 0;
  wishlistCount = 0;
  constructor(
    private userAuthService: UserAuthService,
    private router: Router,
    public userService: UserService
    ,private ProductService: ProductService
    ,private WishlistService: WishlistService
  ) {}

  ngOnInit(): void {
    this.ProductService.cartCount$.subscribe((count: number) => {
      this.cartCount = count;
    });
    this.WishlistService.wishlist$.subscribe(items => {
      this.wishlistCount = items.length;
    });
  }

  /** ✅ Check if user is logged in */
  public isLoggedIn(): boolean {
    return this.userAuthService.getToken() !== null; // 🔧 Ensure this method exists
  }

  /** ✅ Logout the user */
  public logout(): void {
    this.userAuthService.clear() // 🔧 Ensure this exists
    this.router.navigate(['/login'], { replaceUrl: true });
  }

  /** ✅ Check if user is Admin */
  public isAdmin(): boolean {
    return this.userService.roleMatch(['Admin']); // 🔧 Ensure correct role checking
  }

  /** ✅ Check if user is Normal User */
  public isUser(): boolean {
    return this.userService.roleMatch(['User']); // 🔧 Fix role checking
  }
  
  /** ✅ Navigate to login page */
  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  /** ✅ Navigate to any page */
  navigateTo(route: string) {
    this.router.navigate([route]).catch(error => console.error(`Navigation error: ${error}`));
  }
}
