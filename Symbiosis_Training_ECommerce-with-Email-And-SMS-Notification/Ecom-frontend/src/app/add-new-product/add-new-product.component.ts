import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { FileHandel } from '../_model/file-handel.model';
import { Product } from '../_model/product.model';
import { ProductService } from '../_services/product.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-add-new-product',
  imports: [ReactiveFormsModule,CommonModule,MatFormFieldModule,MatInputModule,MatGridListModule,MatIcon,MatButtonModule],
  templateUrl: './add-new-product.component.html',
  styleUrl: './add-new-product.component.css'
})
export class AddNewProductComponent implements OnInit {
  isNewProduct = true;
  productForm: FormGroup;
  productImages: FileHandel[] = [];

  constructor(
    private productService: ProductService, 
    private sanitizer: DomSanitizer,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) { 
    this.productForm = this.fb.group({
      productId: [null],
      productName: ['', Validators.required],
      productDescription: [''],
      productDiscountedPrice: [0, [Validators.required, Validators.min(0)]],
      productActualPrice: [0, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    const productData = this.activatedRoute.snapshot.data['product'];
    if (productData && productData.productId) {
      this.isNewProduct = false;
      this.productForm.patchValue(productData);
      this.productImages = productData.productImages || [];
    }
  }

  onSubmit() {
    console.log('Form Data:', this.productForm.value);
    if (this.productForm.valid) {
      const productData = this.prepareFormData(this.productForm.value);
      console.log('Prepared FormData:', productData); // Debugging line
      this.productService.addProduct(productData).subscribe(
        (response: Product) => {
          console.log('Product added successfully:', response);
          this.clearForm();
        },
        (error: HttpErrorResponse) => {
          console.error('Error:', error);
        }
      );
    }
 }
 

 prepareFormData(product: Product): FormData {
  const formData = new FormData();
  formData.append('product', new Blob([JSON.stringify(product)], { type: 'application/json' }));
  console.log('FormData Content:', formData);

  for (const file of this.productImages) {
    if (file.file) {
      formData.append('imageFile', file.file, file.file.name);
    }
  }

  return formData;
}

  onFileSelected(event: any) {
    if (event.target.files) {
      for (let file of event.target.files) {
        if (file) {
          const fileHandel: FileHandel = {
            file: file as File,
            url: file ? this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file)) : ''
          };
          this.productImages.push(fileHandel);
        }
      }
    }
  }

  removeImage(index: number) {
    this.productImages.splice(index, 1);
  }

  fileDropped(event: any) {
    const files: FileList = event.dataTransfer ? event.dataTransfer.files : event.target.files;
    if (files) {
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const fileHandle: FileHandel = {
                file: file,
                url: URL.createObjectURL(file)
            };
            this.productImages.push(fileHandle);
        }
    }
}

  // ✅ Clear form method
  clearForm(): void {
    this.productForm.reset(); // Reset form fields
    this.productImages = [];  // Clear product images
    this.isNewProduct = true; // Reset flag for new product
  }
}
