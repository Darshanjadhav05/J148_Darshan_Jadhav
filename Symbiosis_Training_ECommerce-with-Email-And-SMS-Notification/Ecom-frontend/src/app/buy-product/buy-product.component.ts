import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ProductService } from '../_services/product.service';
import { Product } from '../_model/product.model';
import { OrderDetails } from '../_model/order-details.model';
import { Address } from '../_model/address.model';
import { HttpClient } from '@angular/common/http';
import { MatFormField } from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-buy-product',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatFormField,
    MatInputModule,
    MatInput,
    MatRadioModule,
    MatSelectModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './buy-product.component.html',
  styleUrls: ['./buy-product.component.css'],
  providers: [CurrencyPipe]
})
export class BuyProductComponent implements OnInit {
  isLoading: boolean = false;
  isSingleProductCheckout: string = "";
  productDetails: Product[] = [];
  orderDetails: OrderDetails = {
    fullName: '',
    fullAddress: '',
    contactNumber: '',
    alternateContactNumber: '',
    orderProductQuantityList: []
  };
  orderForm: FormGroup;
  addressType: string = 'existing';
  savedAddresses: Address[] = [];
  selectedAddressId: number | null = null;

  // New properties for charges
  deliveryCharge: number = 0;
  gstPercentage: number = 18; // 18% GST
  gstAmount: number = 0;
  subtotal: number = 0;
  grandTotal: number = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private router: Router,
    private fb: FormBuilder,
    private http: HttpClient,
    private currencyPipe: CurrencyPipe
  ) {
    this.orderForm = this.fb.group({
      fullName: ['', Validators.required],
      houseNumber: ['', Validators.required],
      street: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      pincode: ['', Validators.required],
      country: ['', Validators.required],
      contactNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      alternateContactNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    });
  }

  ngOnInit(): void {
    this.productDetails = this.activatedRoute.snapshot.data['productDetails'] || [];
    this.isSingleProductCheckout = this.activatedRoute.snapshot.paramMap.get("isSingleProductCheckout") || "";

    this.productDetails.forEach(product => {
      this.orderDetails.orderProductQuantityList.push({
        productId: product.productId ?? 0,
        quantity: 1
      });
    });

    this.loadSavedAddresses();
    this.calculateCharges(); // Initial calculation
  }

  loadSavedAddresses(): void {
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`
    };
  
    this.http.get<Address[]>('http://localhost:9090/address', { headers }).subscribe(
      (res) => {
        this.savedAddresses = res;
      },
      (err) => {
        console.error("Error fetching addresses", err);
      }
    );
  }

  public placeOrder(): void {
    document.body.style.overflow = 'hidden';
    if (this.addressType === 'new') {
      if (this.orderForm.valid) {
        const form = this.orderForm.value;
        this.orderDetails.fullName = form.fullName;
        this.orderDetails.fullAddress = `${form.houseNumber}, ${form.street}, ${form.city}, ${form.state} - ${form.pincode}, ${form.country}`;
        this.orderDetails.contactNumber = form.contactNumber;
        this.orderDetails.alternateContactNumber = form.alternateContactNumber;
      } else {
        return;
      }
    } else if (this.addressType === 'existing' && this.selectedAddressId) {
      const selected = this.savedAddresses.find(a => a.id === this.selectedAddressId);
      if (selected) {
        this.orderDetails.fullName = selected.fullName;
        this.orderDetails.fullAddress = selected.fullAddress;
        this.orderDetails.contactNumber = selected.contactNumber;
        this.orderDetails.alternateContactNumber = selected.alternateContactNumber;
      }
    } else {
      return;
    }

    // Include charges in order details
    this.orderDetails.deliveryCharge = this.deliveryCharge;
    this.orderDetails.gstAmount = this.gstAmount;
    this.orderDetails.totalAmount = this.grandTotal;

    this.isLoading = true;
    this.productService.placeOrder(this.orderDetails, this.isSingleProductCheckout === 'true').subscribe(
      (resp) => {
        document.body.style.overflow = '';
        this.orderForm.reset();
        this.router.navigate(["/orderConfirm"]);
      },
      (err) => {
        document.body.style.overflow = '';
        this.isLoading = false;
        console.error("Error placing order:", err);
      }
    );
  }

  getQuantityForProduct(productId: number): number {
    const product = this.orderDetails.orderProductQuantityList.find(pq => pq.productId === productId);
    return product?.quantity ?? 1;
  }

  onQuantityChanged(quantity: string, productId: number): void {
    const selectedQuantity = Number(quantity);
    if (!isNaN(selectedQuantity)) {
      const product = this.orderDetails.orderProductQuantityList.find(pq => pq.productId === productId);
      if (product) {
        product.quantity = selectedQuantity;
        this.calculateCharges();
      }
    }
  }

  getCalculatedTotal(productId: number, productDiscountedPrice: number): number {
    const product = this.orderDetails.orderProductQuantityList.find(pq => pq.productId === productId);
    return product ? (product.quantity ?? 0) * productDiscountedPrice : 0;
  }

  calculateCharges(): void {
    this.subtotal = this.orderDetails.orderProductQuantityList.reduce((total, pq) => {
      const product = this.productDetails.find(p => p.productId === pq.productId);
      return product ? total + product.productDiscountedPrice * (pq.quantity ?? 0) : total;
    }, 0);

    // Calculate delivery charge (₹50 if subtotal < 500)
    this.deliveryCharge = this.subtotal < 500 && this.subtotal > 0 ? 50 : 0;
    
    // Calculate GST (18% of subtotal)
    this.gstAmount = this.subtotal * (this.gstPercentage / 100);
    
    // Calculate grand total
    this.grandTotal = this.subtotal + this.deliveryCharge + this.gstAmount;
  }

  getCalculatedGrandTotal(): number {
    this.calculateCharges();
    return this.grandTotal;
  }

  formatCurrency(amount: number): string {
    return this.currencyPipe.transform(amount, 'INR') || '';
  }
}