import { Customer } from "./customer";

export interface OrderData {
    amount: number;
    currency: string;
    orderId: string;
    customer: Customer;
}