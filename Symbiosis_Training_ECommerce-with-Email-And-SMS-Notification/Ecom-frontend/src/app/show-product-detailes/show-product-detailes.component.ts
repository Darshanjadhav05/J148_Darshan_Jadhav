import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { map } from 'rxjs/operators';
import { ProductService } from '../_services/product.service';
import { ImageProcessingService } from '../image-processing.service';
import { ShowProductImagesDialogComponent } from '../show-product-images-dialog/show-product-images-dialog.component';
import { Product } from '../_model/product.model';

@Component({
  selector: 'app-show-product-detailes',
  standalone: true,
  templateUrl: './show-product-detailes.component.html',
  styleUrls: ['./show-product-detailes.component.css'],
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
  ],
})
export class ShowProductDetailesComponent implements OnInit {
  showLoadMoreProductButton = false;
  showTable = false;
  pageNumber = 0;
  productDetails: Product[] = [];
  displayedColumns: string[] = [
    'Id',
    'Product Name',
    'Product Description',
    'Product Discounted Price',
    'Product Actual Price',
    'Actions',
  ];

  constructor(
    private productService: ProductService,
    public imagesDialog: MatDialog,
    @Inject(ImageProcessingService) private imageProcessingService: ImageProcessingService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  searchByKeyword(searchKeyword: string): void {
    this.pageNumber = 0;
    this.productDetails = [];
    this.getAllProducts(searchKeyword);
  }

  getAllProducts(searchKey: string = ''): void {
    this.showTable = false;
    this.productService
      .getAllProducts(this.pageNumber, searchKey)
      .pipe(
        map((products: Product[]) =>
          products.map((product) => this.imageProcessingService.createImages(product))
        )
      )
      .subscribe(
        (resp: Product[]) => {
          console.log(resp);
          this.productDetails.push(...resp);
          this.showTable = true;
          this.showLoadMoreProductButton = resp.length === 2;
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      );
  }

  loadMoreProduct(): void {
    this.pageNumber++;
    this.getAllProducts();
  }

  deleteProduct(productId: number): void {
    this.productService.deleteProduct(productId).subscribe(
      () => {
        this.getAllProducts();
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  showImages(product: Product): void {
    this.imagesDialog.open(ShowProductImagesDialogComponent, {
      data: { images: product.productImages },
      height: 'inherit',
    });
  }

  editProductDetails(productId: number): void {
    this.router.navigate(['/addNewProduct', { productId }]);
  }
}
