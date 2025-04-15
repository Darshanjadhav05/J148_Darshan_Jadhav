import { FileHandel } from './file-handel.model';

export interface Product {
    productId?: number; // Optional for new products
    productName: string;
    productDescription: string;
    productDiscountedPrice: number;
    productActualPrice: number;
    productImages: FileHandel[];
    isNew?: boolean; // Optional property
    isBestSeller?: boolean; // Optional property
    rating?: number; // Optional property (0-5)
    reviewCount?: number; // Optional property
}
