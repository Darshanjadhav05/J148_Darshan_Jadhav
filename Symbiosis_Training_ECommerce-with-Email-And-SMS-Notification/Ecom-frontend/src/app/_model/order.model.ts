import { Product } from './product.model';

export interface MyOrderDetails {
orderDate: string|number|Date;
    readonly orderId: number;
    orderFullName: string;
    orderFullOrder: string; // Fixed typo
    orderContactNumber: string;
    orderAlternateContactNumber?: string; // Optional if not always required
    orderStatus: string;
    orderAmount: number;
    product: Product;
    user?: any; // Replace `any` with `User` if you have a User model
}
