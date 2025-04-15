import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ImageProcessingService } from './image-processing.service';
import { Product } from './_model/product.model';
import { ProductService } from './_services/product.service';

@Injectable({
  providedIn: 'root'
})
export class ProductResolveService implements Resolve<Product> {

  constructor(
    private productService: ProductService,
    private imageProcessingService: ImageProcessingService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Product> {
    const id = route.paramMap.get("id");

    if (id) {
      const numericId = Number(id);
      return this.productService.getProductDetailsById(numericId).pipe(
        map((product) => this.imageProcessingService.createImages(product)),
        catchError((error) => {
          console.error("Error fetching product details:", error);
          return of(this.getDefaultProduct());
        })
      );
    } else {
      return of(this.getDefaultProduct());
    }
  }

  private getDefaultProduct(): Product {
    return {
      productId: undefined,
      productName: "",
      productDescription: "",
      productDiscountedPrice: 0,
      productActualPrice: 0,
      productImages: []
    };
  }
}
