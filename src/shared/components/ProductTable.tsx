import { useState, useEffect } from 'react';
import type { IProduct } from '../models/product.model';
// import { api } from '../../core/services/api.service'; // Usaremos em breve

export function ProductTable() {
  // Estado local fortemente tipado usando a nossa interface
  const [products, setProducts] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Simulando a chamada para a sua API Java
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        // TODO: Substituir por chamada real: await api.get('/products')
        
        // Mock data para testarmos a renderização inicial
        const mockData: IProduct[] = [
          {
            id: 1,
            sku: 'TECH-001',
            name: 'Mechanical Keyboard RGB',
            description: 'Wireless mechanical keyboard with tactile switches.',
            price: 12999, // Trabalhar com centavos evita bugs de ponto flutuante
            stockQuantity: 45,
            status: 'ACTIVE',
            createdAt: '2026-02-23T10:00:00Z',
            updatedAt: '2026-02-23T10:00:00Z'
          },
          {
            id: 2,
            sku: 'TECH-002',
            name: 'Ergonomic Mouse',
            description: 'Vertical ergonomic mouse for productivity.',
            price: 5990,
            stockQuantity: 0,
            status: 'OUT_OF_STOCK',
            createdAt: '2026-02-22T14:30:00Z',
            updatedAt: '2026-02-22T14:30:00Z'
          }
        ];

        // Simulando delay de rede de 1 segundo
        setTimeout(() => {
          setProducts(mockData);
          setIsLoading(false);
        }, 1000);

      } catch (error) {
        console.error('Failed to fetch products', error);
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Função auxiliar para formatar moeda
  const formatCurrency = (amountInCents: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amountInCents / 100);
  };

  if (isLoading) {
    return <div className="flex justify-center p-8 text-gray-500">Loading inventory data...</div>;
  }

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
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
          {products.map((product) => (
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
          ))}
        </tbody>
      </table>
    </div>
  );
}