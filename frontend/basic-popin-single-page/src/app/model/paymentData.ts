import { Customer } from "./customer";

export interface PaymentData {
    amount: number;
    currency: string;
    orderId: string;
    customer: Customer;
}