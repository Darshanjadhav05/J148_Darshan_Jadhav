import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ImageProcessingService } from './image-processing.service';
import { Product } from './_model/product.model';
import { ProductService } from './_services/product.service';



@Injectable({
  providedIn: 'root'
})
export class BuyProductResolverService implements Resolve<Product[]> {
  
  constructor(
    private productService: ProductService, 
    private imageProcessingService: ImageProcessingService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Product[]> {
    const id = parseInt(route.paramMap.get('id') ?? '', 10); // Convert `id` to a number
    const isSingleProductCheckout = route.paramMap.get('isSingleProductCheckout') === 'true';

    return this.productService.getProductDetails(isSingleProductCheckout, id).pipe(
      map((products: Product[]) => 
        products.map((product: Product) => this.imageProcessingService.createImages(product))
      )
    );
  }
}
