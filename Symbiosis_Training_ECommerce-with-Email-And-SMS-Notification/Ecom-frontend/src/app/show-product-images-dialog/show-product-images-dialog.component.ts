import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'app-show-product-images-dialog',
  standalone: true,
  templateUrl: './show-product-images-dialog.component.html',
  styleUrls: ['./show-product-images-dialog.component.css'],
  imports: [CommonModule, MatGridListModule],
})
export class ShowProductImagesDialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { images: { url: string }[] }) {}

  ngOnInit(): void {
    this.receiveImages();
  }

  receiveImages() {
    console.log('Received Images:', this.data);
  }
}
