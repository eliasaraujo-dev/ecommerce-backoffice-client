// src/features/inventory/components/ProductTable.tsx

import { useState, useEffect } from 'react';
import type { IProduct } from '../models/product.model';
import { InventoryService, type PaginatedResponse } from '../../features/inventory/services/inventory.service';

export function ProductTable() {
  // Data and Pagination State
  const [products, setProducts] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(0); // 0-indexed for Spring Boot APIs
  const [totalPages, setTotalPages] = useState<number>(0);
  const [totalElements, setTotalElements] = useState<number>(0);

  // Fetch data whenever currentPage changes
  useEffect(() => {
    const fetchInventory = async () => {
      try {
        setIsLoading(true);
        // Using our Singleton service to fetch real data
        const response: PaginatedResponse<IProduct> = await InventoryService.getProducts(currentPage, 10);
        
        setProducts(response.content);
        setTotalPages(response.totalPages);
        setTotalElements(response.totalElements);
      } catch (error) {
        console.error('Failed to fetch inventory data:', error);
        // TODO: Integrate with a Toast Notification system (e.g., react-toastify)
      } finally {
        setIsLoading(false);
      }
    };

    fetchInventory();
  }, [currentPage]); // The dependency array ensures it runs when the page changes

  // Utility to format currency safely
  const formatCurrency = (amountInCents: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amountInCents / 100);
  };

  // Pagination Handlers
  const handleNextPage = () => {
    if (currentPage < totalPages - 1) setCurrentPage(prev => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 0) setCurrentPage(prev => prev - 1);
  };

  return (
    <div className="bg-white rounded-lg shadow flex flex-col">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm whitespace-nowrap">
          <thead className="uppercase tracking-wider border-b-2 border-gray-200 bg-gray-50">
            <tr>
              <th className="px-6 py-4 font-medium text-gray-900">SKU</th>
              <th className="px-6 py-4 font-medium text-gray-900">Product Name</th>
              <th className="px-6 py-4 font-medium text-gray-900">Price</th>
              <th className="px-6 py-4 font-medium text-gray-900">Stock</th>
              <th className="px-6 py-4 font-medium text-gray-900">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {isLoading ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                  Loading inventory data...
                </td>
              </tr>
            ) : products.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                  No products found in the inventory.
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-mono text-gray-500">{product.sku}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">{product.name}</td>
                  <td className="px-6 py-4 text-gray-700">{formatCurrency(product.price)}</td>
                  <td className="px-6 py-4 text-gray-700">{product.stockQuantity} units</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      product.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 
                      product.status === 'OUT_OF_STOCK' ? 'bg-red-100 text-red-800' : 
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {product.status.replace('_', ' ')}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing page <span className="font-medium">{currentPage + 1}</span> of{' '}
              <span className="font-medium">{totalPages === 0 ? 1 : totalPages}</span> 
              {' '}(Total: {totalElements} items)
            </p>
          </div>
          <div>
            <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 0 || isLoading}
                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed focus:z-20 focus:outline-offset-0"
              >
                Previous
              </button>
              <button
                onClick={handleNextPage}
                disabled={currentPage >= totalPages - 1 || isLoading}
                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed focus:z-20 focus:outline-offset-0"
              >
                Next
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}