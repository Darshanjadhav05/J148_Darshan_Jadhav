import { Injectable } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { FileHandel } from './_model/file-handel.model';
import { Product } from './_model/product.model';

@Injectable({
  providedIn: 'root'
})
export class ImageProcessingService {
  
  constructor(private sanitizer: DomSanitizer) {}

  /**
   * Process the images of a product and return updated product with image URLs.
   * @param product - The product to process.
   * @param useDataUrl - If true, uses base64 `data:` URL (safe for display); if false, uses `blob:` URL (useful for upload preview).
   */
  public createImages(product: Product): Product {
    if (!product.productImages || !Array.isArray(product.productImages)) {
      console.error('Invalid productImages format:', product.productImages);
      return product;
    }
  
    const productImagesToFileHandle: FileHandel[] = (product.productImages as any[]).map((imageFileData) => {
      // If already processed (has 'file' and 'url'), return as-is
      if ('file' in imageFileData && 'url' in imageFileData) {
        return imageFileData as FileHandel;
      }
  
      // Process only if it has picByte, name, and type
      if (!imageFileData.picByte || !imageFileData.type || !imageFileData.name) {
        console.warn('Incomplete image data:', imageFileData);
        return null;
      }
  
      const imageBlob = this.dataURItoBlob(imageFileData.picByte, imageFileData.type);
      const imageFile = new File([imageBlob], imageFileData.name, { type: imageFileData.type });
  
      return {
        file: imageFile,
        url: this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(imageFile)) as SafeUrl
      };
    }).filter((fileHandel): fileHandel is FileHandel => fileHandel !== null);
  
    product.productImages = productImagesToFileHandle;
    return product;
  }
  /**
   * Converts base64 string and type to a Blob.
   */
  private dataURItoBlob(picBytes: string, imageType: string): Blob {
    try {
      const byteString = atob(picBytes);
      const arrayBuffer = new ArrayBuffer(byteString.length);
      const int8Array = new Uint8Array(arrayBuffer);

      for (let i = 0; i < byteString.length; i++) {
        int8Array[i] = byteString.charCodeAt(i);
      }

      return new Blob([int8Array], { type: imageType });
    } catch (error) {
      console.error('Error converting data URI to Blob:', error);
      return new Blob(); // Return empty Blob on error
    }
  }
}
