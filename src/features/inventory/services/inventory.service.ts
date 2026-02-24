import { api } from '../../../core/services/api.service';
import type { IProduct } from '../../../shared/models/product.model';

// Generic interface for mirroring the pagination of the API response (e.g., Spring Data REST)
export interface PaginatedResponse<T> {
    content: T[];
    totalElements: number;
    totalPages: number;
    size: number;
    number: number; // current page index
}

export type CreateProductDTO = Omit<IProduct, 'id' | 'createdAt' | 'status'>;

export const InventoryService = {

    /**
     * Fetches a paginated list of products from the API.
     * @param page Page number (0-based index)
     * @param size Number of items per page
     */
    getProducts: async (page: number = 0, size: number = 10): Promise<PaginatedResponse<IProduct>> => {
        const response = await api.get<PaginatedResponse<IProduct>>('/products', {
            params: { page, size }
        });
        return response.data;
    },

    /**
     * Fetches a single product by its ID.
     */
    getProductById: async (id: number): Promise<IProduct> => {
        const response = await api.get<IProduct>(`/products/${id}`);
        return response.data;
    },

    /**
     * Creates a new product in the inventory.
     */
    createProduct: async (productData: CreateProductDTO): Promise<IProduct> => {
        const response = await api.post<IProduct>('/products', productData);
        return response.data;
    },

    /**
     * Updates only the status of a specific product. (e.g., from ACTIVE to OUT_OF_STOCK)
     */
    updateProductStatus: async (id: number, status: IProduct['status']): Promise<void> => {
        // Assuming the API supports a PATCH endpoint for updating just the status
        await api.patch(`/products/${id}/status`, { status });
    }
};