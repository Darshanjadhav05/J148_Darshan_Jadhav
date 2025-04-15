import { Component, OnInit } from '@angular/core';
import { MyOrderDetails } from '../_model/order.model';
import { ProductService } from '../_services/product.service';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { TruncatePipe } from '../truncate.pipe';

@Component({
  selector: 'app-my-orders',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatPaginatorModule,
    TruncatePipe
  ],
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  myOrderDetails: MyOrderDetails[] = [];
  filteredOrders: MyOrderDetails[] = [];
  paginatedOrders: MyOrderDetails[] = [];
  selectedStatus: string = 'all';
  pageSize = 5;
  currentPage = 0;
  totalOrders = 0;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getOrderDetails();
  }

  getOrderDetails(): void {
    this.productService.getMyOrders().subscribe({
      next: (resp: MyOrderDetails[]) => {
        this.myOrderDetails = resp;
        this.filteredOrders = [...this.myOrderDetails];
        this.totalOrders = this.filteredOrders.length;
        this.applyPagination();
      },
      error: (err) => {
        console.log("❌ Error fetching order details:", err);
      }
    });
  }

  applyFilter(): void {
    if (this.selectedStatus === 'all') {
      this.filteredOrders = [...this.myOrderDetails];
    } else {
      this.filteredOrders = this.myOrderDetails.filter(
        order => order.orderStatus.toLowerCase() === this.selectedStatus
      );
    }
    this.totalOrders = this.filteredOrders.length;
    this.currentPage = 0;
    this.applyPagination();
  }

  applyPagination(): void {
    const startIndex = this.currentPage * this.pageSize;
    this.paginatedOrders = this.filteredOrders.slice(
      startIndex,
      startIndex + this.pageSize
    );
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.applyPagination();
  }

  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'processing': return 'status-processing';
      case 'shipped': return 'status-shipped';
      case 'delivered': return 'status-delivered';
      case 'cancelled': return 'status-cancelled';
      default: return 'status-default';
    }
  }

  getProductImage(product: any): string {
    if (!product || !product.productImages) {
      return 'assets/default-product.png';
    }
  
    const image = product.productImages;
  
    // Case 1: If it's a string
    if (typeof image === 'string') {
      return this.fixImageUrl(image);
    }
  
    // Case 2: If it's an array, use first image object
    if (Array.isArray(image) && image.length > 0) {
      return this.createImageFromBytes(image[0]);
    }
  
    // Case 3: If it's an object with picByte
    if (image.picByte) {
      return this.createImageFromBytes(image);
    }
  
    return 'assets/default-product.png';
  }
  private createImageFromBytes(imageObj: any): string {
    if (!imageObj || !imageObj.picByte || !imageObj.type) {
      return 'assets/default-product.png';
    }
  
    return `data:${imageObj.type};base64,${imageObj.picByte}`;
  }
    

  private fixImageUrl(url: any): string {
    if (!url || typeof url !== 'string' || url.includes('[object Object]')) {
      return 'assets/default-product.png';
    }
    if (url.startsWith('http') || url.startsWith('/')) return url;
    return `/assets/products/${url}`;
  }
  

  handleImageError(event: Event) {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = 'assets/default-product.png';
    imgElement.onerror = null;
  }
}
