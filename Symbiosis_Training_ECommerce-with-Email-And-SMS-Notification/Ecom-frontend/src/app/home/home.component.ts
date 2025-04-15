import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ImageProcessingService } from '../image-processing.service';
import { Product } from '../_model/product.model';
import { ProductService } from '../_services/product.service';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TruncatePipe } from '../truncate.pipe';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DatePipe } from '@angular/common';
import { WishlistService } from '../_services/wishlist.service';

interface HeroImage {
  url: string;
  alt: string;
  title: string;
  description: string;
}

interface Category {
  id: number;
  name: string;
  icon: string;
}

interface SpecialOffer {
  title: string;
  description: string;
  imageUrl: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    NgbCarouselModule,
    MatSelectModule,
    MatTooltipModule,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  pageNumber: number = 0;
  productDetails: Product[] = [];
  showLoadButton = false;
  searchSubject: Subject<string> = new Subject<string>();
  isLoading = false;
  selectedSort = 'popularity';
  wishlistItems: number[] = [];

  // Hero Carousel Images
  heroImages: HeroImage[] = [
    {
      url: 'assets/1.jpg',
      alt: 'Summer Collection',
      title: 'Summer Collection 2023',
      description: 'Up to 50% off on selected items'
    },
    {
      url: 'assets/3.jpg',
      alt: 'New Arrivals',
      title: 'New Arrivals',
      description: 'Discover our latest products'
    },
    {
      url: 'assets/2.jpg',
      alt: 'Electronics Sale',
      title: 'Tech Week',
      description: 'Biggest discounts on electronics'
    }
  ];

  // Categories
  categories: Category[] = [
    { id: 1, name: 'Electronics', icon: 'devices' },
    { id: 2, name: 'Fashion', icon: 'checkroom' },
    { id: 3, name: 'Home & Kitchen', icon: 'home' },
    { id: 4, name: 'Beauty', icon: 'spa' },
    { id: 5, name: 'Sports', icon: 'sports_soccer' },
    { id: 6, name: 'Books', icon: 'menu_book' }
  ];

  // Special Offers
  specialOffers: SpecialOffer[] = [
    {
      title: 'Weekend Special',
      description: 'Extra 10% off on orders above ₹2000',
      imageUrl: "assets/offer-1.png"
    },
    {
      title: 'Free Shipping',
      description: 'No cost delivery on all orders',
      imageUrl: 'assets/offer-2.jpg'
    },
    {
      title: 'New User Offer',
      description: 'Get ₹500 off on your first order',
      imageUrl: 'assets/offer-3.jpg'
    }
  ];

  constructor(
    private productService: ProductService,
    private imageProcessingService: ImageProcessingService,
    private router: Router,
    private snackBar: MatSnackBar,
    public wishlistService: WishlistService,
  ) {}

  ngOnInit(): void {
    this.getAllProducts();
    this.loadWishlist();

    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe((searchKey) => {
      this.pageNumber = 0;
      this.productDetails = [];
      this.getAllProducts(searchKey.trim());
    });
  }

  calculateDiscount(originalPrice: number, discountedPrice: number): number {
    return Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);
  }

  isNewProduct(addedDate: string | undefined): boolean {
    if (!addedDate) return false;
    const productDate = new Date(addedDate);
    const currentDate = new Date();
    const diffTime = currentDate.getTime() - productDate.getTime();
    const diffDays = diffTime / (1000 * 60 * 60 * 24);
    return diffDays < 30; // Considered new if added within last 30 days
  }

  searchByKeyword(searchKey: string): void {
    this.searchSubject.next(searchKey);
  }

  getAllProducts(searchKey: string = ""): void {
    this.isLoading = true;
    this.productService.getAllProducts(this.pageNumber, searchKey)
      .pipe(
        map((products: Product[]) =>
          products.map((product: Product) =>
            this.imageProcessingService.createImages(product)
          )
        )
      )
      .subscribe(
        (resp: Product[]) => {
          this.isLoading = false;
          this.showLoadButton = resp.length === 8;
          this.productDetails = [...this.productDetails, ...resp];
          this.sortProducts(); // Apply sorting after loading
        },
        (error: HttpErrorResponse) => {
          this.isLoading = false;
          console.error("Error fetching products:", error);
          this.showSnackBar('Error loading products. Please try again.', true);
        }
      );
  }
  

  sortProducts(): void {
    switch(this.selectedSort) {
      case 'price-low':
        this.productDetails.sort((a, b) => a.productDiscountedPrice - b.productDiscountedPrice);
        break;
      case 'price-high':
        this.productDetails.sort((a, b) => b.productDiscountedPrice - a.productDiscountedPrice);
        break;
      // case 'newest':
      //   this.productDetails.sort((a, b) => 
      //     new Date(b.addedDate || '').getTime() - new Date(a.addedDate || '').getTime());
      //   break;
      case 'discount':
        this.productDetails.sort((a, b) => 
          this.calculateDiscount(b.productActualPrice, b.productDiscountedPrice) - 
          this.calculateDiscount(a.productActualPrice, a.productDiscountedPrice));
        break;
      default: // popularity
        this.productDetails.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }
  }

  loadMoreProduct(): void {
    this.pageNumber++;
    this.getAllProducts();
  }

  showProductDetails(productId: number): void {
    this.router.navigate(['/productViewDetails', productId]);
  }

  addtocart(productId: number): void {
    this.productService.addToCart(productId).subscribe({
      next: (response) => {
        this.showSnackBar('Product added to cart successfully!');
      },
      error: (error) => {
        console.error('Error adding to cart:', error);
        this.showSnackBar('Failed to add product to cart', true);
      }
    });
  }

  toggleWishlist(productId: number) {
    this.wishlistService.toggleItem(productId);
    const isInWishlist = this.wishlistService.isInWishlist(productId);
    this.snackBar.open(
      isInWishlist ? 'Removed from wishlist 💔' : 'Added to wishlist ❤️',
      'Close',
      { duration: 2000 }
    );
  }

  isInWishlist(productId: number): boolean {
    return this.wishlistItems.includes(productId);
  }

  loadWishlist(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      const wishlist = localStorage.getItem('wishlist');
      this.wishlistItems = wishlist ? JSON.parse(wishlist) : [];
    } else {
      this.wishlistItems = [];
    }
  }
  

  navigateToCategory(categoryId: number): void {
    this.router.navigate(['/category', categoryId]);
  }

  resetSearch(): void {
    this.pageNumber = 0;
    this.productDetails = [];
    this.getAllProducts();
  }

  private showSnackBar(message: string, isError: boolean = false): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: isError ? ['snackbar-error'] : ['snackbar-success'],
      horizontalPosition: 'end',
      verticalPosition: 'top'
    });
  }
}