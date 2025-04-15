import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { ProductService } from '../_services/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  displayedColumns: string[] = ['Name', 'Description', 'Price', 'Discounted Price', 'Action'];
  cartDetails: any[] = [];

  constructor(private productService: ProductService, private router: Router,private snackBar: MatSnackBar,) {}

  ngOnInit(): void {
    this.getCartDetails();
  }

  delete(cartId: number) {
    this.productService.deleteCartItem(cartId).subscribe(
      () => {
        this.getCartDetails(); // fetch updated list
      },
      (error) => console.log(error)
    );
  }

  getCartDetails() {
    this.productService.getCartDetails().subscribe(
      (response: any[]) => {
        this.cartDetails = response;
        this.productService.updateCartCount(); // 🔁 Notify other components
      },
      (error) => console.log(error)
    );
  }

  checkout() {
    if (this.cartDetails.length === 0) {

      this.showSnackBar('Your cart is empty. Please add items to proceed to checkout.',true);
      return;
    }
    this.router.navigate(['/buyProduct', false, 0]);
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
