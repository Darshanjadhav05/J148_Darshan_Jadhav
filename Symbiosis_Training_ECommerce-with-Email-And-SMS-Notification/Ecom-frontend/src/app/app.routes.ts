import { Routes } from '@angular/router';

import { AddNewProductComponent } from './add-new-product/add-new-product.component';
import { AdminComponent } from './admin/admin.component';
import { BuyProductResolverService } from './buy-product-resolver.service';
import { BuyProductComponent } from './buy-product/buy-product.component';
import { CartComponent } from './cart/cart.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { OrderConfirmationComponent } from './order-confirmation/order-confirmation.component';
import { OrderDetaisComponent } from './order-detais/order-detais.component';
import { ProductResolveService } from './product-resolve.service';
import { ProductViewDetailsComponent } from './product-view-details/product-view-details.component';
import { RegisterComponent } from './register/register.component';
import { ShowProductDetailesComponent } from './show-product-detailes/show-product-detailes.component';
import { UserComponent } from './user/user.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { AuthGuard } from './_auth/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forbidden', component: ForbiddenComponent },

  // Admin Routes
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard], data: { roles: ['Admin'] } },
  { path: 'addNewProduct', component: AddNewProductComponent, canActivate: [AuthGuard], data: { roles: ['Admin'] }, resolve: { product: ProductResolveService } },
  { path: 'showProductDetails', component: ShowProductDetailesComponent, canActivate: [AuthGuard], data: { roles: ['Admin'] } },
  { path: 'orderInformation', component: OrderDetaisComponent, canActivate: [AuthGuard], data: { roles: ['Admin'] } },

  // User Routes
  { path: 'user', component: UserComponent, canActivate: [AuthGuard], data: { roles: ['User'] } },
  { 
    path: 'buyProduct/:isSingleProductCheckout/:id',
    component: BuyProductComponent,
    canActivate: [AuthGuard],
    data: { roles: ['User'] },
    resolve: { productDetails: BuyProductResolverService }
  },
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard], data: { roles: ['User'] } },
  { path: 'orderConfirm', component: OrderConfirmationComponent, canActivate: [AuthGuard], data: { roles: ['User'] } },
  { path: 'myOrders', component: MyOrdersComponent, canActivate: [AuthGuard], data: { roles: ['User'] } },
  { path: 'wishlist', component: WishlistComponent, canActivate: [AuthGuard], data: { roles: ['User'] } },

  // Product View with ID
  { path: 'productViewDetails/:id', component: ProductViewDetailsComponent, resolve: { product: ProductResolveService } },

  // Fallback
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
