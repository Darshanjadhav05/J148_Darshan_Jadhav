import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Product } from '../_model/product.model';
import { ProductService } from '../_services/product.service';
import { ImageDialogComponent } from '../image-dialog/image-dialog.component';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ImageProcessingService } from '../image-processing.service';

@Component({
  selector: 'app-product-view-details',
  standalone: true,
  templateUrl: './product-view-details.component.html',
  styleUrls: ['./product-view-details.component.css'],
  imports: [
    CommonModule,
    MatButtonModule,
    MatGridListModule,
    MatIconModule,
    MatDividerModule,
    MatDialogModule
    
  ],
})
export class ProductViewDetailsComponent implements OnInit {
  selectProductIndex = 0;
  product!: Product;
  isLoading = true;

  constructor(
    private activatedRoute: ActivatedRoute, 
    private router: Router,
    private productService: ProductService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private imageProcessingService: ImageProcessingService,
    
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(data => {
      const rawProduct: Product = data['product'] || {} as Product;

      // ✅ Safely process images
      this.product = this.imageProcessingService.createImages(rawProduct);
  
      this.isLoading = false;
    });
  }

  changeIndex(index: number): void {
    this.selectProductIndex = index;
  }

  calculateDiscountPercent(): number {
    if (!this.product) return 0;
    return Math.round(
      ((this.product.productActualPrice - this.product.productDiscountedPrice) / 
       this.product.productActualPrice) * 100
    );
  }

  buyProduct(productId: number): void {
    this.router.navigate(['/buyProduct', { 
      isSingleProductCheckout: true, 
      id: productId 
    }]);
  }

  addToCart(productId: number): void {
    this.productService.addToCart(productId).subscribe({
      next: (response) => {
        console.log(response);
        this.showSnackBar('Product added to cart successfully!');
      },
      error: (error) => {
        console.error('Error adding to cart:', error);
        this.showSnackBar('Failed to add product to cart', true);
      }
    });
  }

  
  zoomImage(imageUrl: SafeUrl ): void {
    this.dialog.open(ImageDialogComponent, {
      data: { imageUrl },
      panelClass: 'custom-dialog-container'
    });
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