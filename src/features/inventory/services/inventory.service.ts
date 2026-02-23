// src/features/inventory/services/inventory.service.ts
import { api } from '../../../core/services/api.service';
import type { IProduct } from '../../../shared/models/product.model';

export const InventoryService = {
    getAllProducts: async (): Promise<IProduct[]> => {
        const response = await api.get<IProduct[]>('/products');
        return response.data;
    },

    createProduct: async (productData: Omit<IProduct, 'id' | 'createdAt'>): Promise<IProduct> => {
        const response = await api.post<IProduct>('/products', productData);
        return response.data;
    }
};