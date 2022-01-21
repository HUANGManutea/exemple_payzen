import { Customer } from "./curtomer";

export interface PaymentData {
    amount: number;
    currency: string;
    orderId: string;
    customer: Customer;
}