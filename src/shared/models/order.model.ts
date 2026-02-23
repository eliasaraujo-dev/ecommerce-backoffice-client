export type OrderStatus = 'PENDING' | 'PAID' | 'SHIPPED' | 'DELIVERED' | 'CANCELED';

export interface IOrderItem {
    productId: number;
    productName: string;
    quantity: number;
    unitPrice: number;
    subTotal: number;
}

export interface IOrder {
    id: string;
    customerId: number;
    customerName: string;
    items: IOrderItem[];
    totalAmount: number;
    status: OrderStatus;
    orderDate: string;
}