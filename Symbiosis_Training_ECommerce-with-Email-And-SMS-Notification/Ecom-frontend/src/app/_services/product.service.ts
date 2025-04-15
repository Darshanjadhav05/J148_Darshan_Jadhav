import { HttpClient  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { OrderDetails } from '../_model/order-details.model';
import { MyOrderDetails } from '../_model/order.model';
import { Product } from '../_model/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = "http://localhost:9090"; // ✅ Centralized API base URL

  private cartCountSubject = new BehaviorSubject<number>(0); // 🔄 holds latest cart count
  cartCount$ = this.cartCountSubject.asObservable(); // 🔁 observable to subscribe from any component

  constructor(private httpClient: HttpClient) { }

  
  public updateCartCount() {
    this.getCartDetails().subscribe((cartItems: any[]) => {
      this.cartCountSubject.next(cartItems.length); // 📦 update count
    });
  }
  public getAllOrderDetailsForAdmin(): Observable<MyOrderDetails[]> {
    return this.httpClient.get<MyOrderDetails[]>(`${this.baseUrl}/getAllOrderDetails`);
  }

  public getMyOrders(): Observable<MyOrderDetails[]> {
    return this.httpClient.get<MyOrderDetails[]>(`${this.baseUrl}/getOrderDetails`);
  }

  public deleteCartItem(cartId: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/deleteCartItem/${cartId}`);
  }

  public addProduct(product: FormData): Observable<Product> {


    return this.httpClient.post<Product>(`${this.baseUrl}/addNewProduct`, product);
  }

  public getAllProducts(pageNumber: number, searchKeyword: string = ""): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${this.baseUrl}/getAllProducts?pageNumber=${pageNumber}&searchKey=${searchKeyword}`);
  }

  public getProductDetailsById(productId: number): Observable<Product> {
    return this.httpClient.get<Product>(`${this.baseUrl}/getProductDetailsById/${productId}`);
  }

  public deleteProduct(productId: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/deleteProductDetails/${productId}`);
  }

  public getProductDetails(isSingleProductCheckout: boolean, productId: number): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${this.baseUrl}/getProductDetails/${isSingleProductCheckout}/${productId}`);
  }

  public placeOrder(orderDetails: OrderDetails, isCartCheckout: boolean): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/placeOrder/${isCartCheckout}`, orderDetails);
  }

  public addToCart(productId: number): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/addToCart/${productId}`);
  }

  public getCartDetails(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/getCartDetails`);
  }
  public getProductsByIds(ids: number[]): Observable<Product[]> {
    return this.httpClient.post<Product[]>(`${this.baseUrl}/getProductsByIds`, ids);
  }
  
  
}
