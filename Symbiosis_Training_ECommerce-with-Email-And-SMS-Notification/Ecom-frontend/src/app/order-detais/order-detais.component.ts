import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ProductService } from '../_services/product.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { TruncatePipe } from '../truncate.pipe';
@Component({
  selector: 'app-order-detais',
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
    MatMenuModule,
    MatTooltipModule,
    TruncatePipe
  ],
  templateUrl: './order-detais.component.html',
  styleUrls: ['./order-detais.component.css']
})
export class OrderDetaisComponent implements OnInit {
  displayedColumns: string[] = ['Id', 'Product', 'Customer', 'Address', 'Contact', 'Status', 'Actions'];
  dataSource = new MatTableDataSource<any>();
  selectedStatus: string = 'all';
  pageSize = 10;
  pageSizeOptions = [5, 10, 25, 50];
  totalOrders = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private productService: ProductService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getAllOrderDetailsForAdmin();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getAllOrderDetailsForAdmin(): void {
    this.productService.getAllOrderDetailsForAdmin().subscribe({
      next: (resp) => {
        this.dataSource.data = resp;
        this.totalOrders = resp.length;
        this.applyPagination();
      },
      error: (error) => {
        console.error('Error fetching orders:', error);
      }
    });
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

  applyFilter(): void {
    if (this.selectedStatus === 'all') {
      this.dataSource.filter = '';
    } else {
      this.dataSource.filter = this.selectedStatus.trim().toLowerCase();
    }
    this.applyPagination();
  }

  applyPagination(): void {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    const endIndex = startIndex + this.paginator.pageSize;
    this.dataSource.data = this.dataSource.filteredData.slice(startIndex, endIndex);
  }

  onPageChange(event: any): void {
    this.applyPagination();
  }

  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'processing':
        return 'status-processing';
      case 'shipped':
        return 'status-shipped';
      case 'delivered':
        return 'status-delivered';
      case 'cancelled':
        return 'status-cancelled';
      default:
        return 'status-default';
    }
  }

  viewDetails(order: any): void {
    // Implement navigation to order details
    console.log('View details:', order);
  }

  

  contactCustomer(order: any): void {
    // Implement customer contact logic
    console.log('Contact customer:', order);
  }

  exportOrders(): void {
    // Implement export functionality
    console.log('Export orders');
  }
}