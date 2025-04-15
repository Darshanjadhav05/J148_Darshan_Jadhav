import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-image-dialog',
  template: `
    <img 
      [src]="data.imageUrl"
      class="dialog-image"
      alt="Zoomed product image"
      (click)="toggleZoom()"
      [class.zoomed]="isZoomed">
  `,
  styles: [`
    .dialog-image {
      max-width: 100%;
      max-height: 80vh;
      display: block;
      margin: auto;
      cursor: zoom-in;
      transition: transform 0.25s ease;
    }
    .dialog-image.zoomed {
      transform: scale(2);
      cursor: zoom-out;
    }
  `]
})
export class ImageDialogComponent {
  isZoomed = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { imageUrl: SafeUrl  }) {}

  toggleZoom(): void {
    this.isZoomed = !this.isZoomed;
  }
}