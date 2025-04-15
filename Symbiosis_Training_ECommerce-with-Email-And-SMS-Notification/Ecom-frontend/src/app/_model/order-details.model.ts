import { OrderQuantity } from './order-quantity.model';

export interface OrderDetails {
  fullName: string;
  fullAddress: string;
  contactNumber: string;
  alternateContactNumber?: string; // Optional if not always required
  orderProductQuantityList: OrderQuantity[];
  deliveryCharge?: number;
  gstAmount?: number;
  totalAmount?: number;
}
