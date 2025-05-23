import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductViewDetailsComponent } from './product-view-details.component';

describe('ProductViewDetailsComponent', () => {
  let component: ProductViewDetailsComponent;
  let fixture: ComponentFixture<ProductViewDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductViewDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductViewDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
