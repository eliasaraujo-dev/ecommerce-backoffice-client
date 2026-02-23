export type ProductStatus = 'ACTIVE' | 'OUT_OF_STOCK' | 'ARCHIVED';

export interface IProduct {
    id: number;
    sku: string;
    name: string;
    description: string;
    price: number;
    stockQuantity: number;
    status: ProductStatus;
    createdAt: string;
    updatedAt: string;
}