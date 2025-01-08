import { api } from './api';

export interface Payment {
    id: string;
    amount: number;
    date: string;
    status: 'Paid' | 'Pending' | 'Failed';
}

export interface Contract {
    id: string;
    instructorId: string;
    instructorName: string;
    contractType: 'Revenue Share' | 'Fixed Rate';
    amount: number;
    status: 'Active' | 'Pending' | 'Completed';
    startDate: string;
    endDate: string;
    terms: string;
    paymentHistory: Payment[];
}

class PaymentsService {
    async getPayments(): Promise<Payment[]> {
        const response = await api.get('/payments');
        return response.data;
    }

    async getContracts(): Promise<Contract[]> {
        const response = await api.get('/contracts');
        return response.data;
    }

    async createPayment(payment: Omit<Payment, 'id'>): Promise<Payment> {
        const response = await api.post('/payments', payment);
        return response.data;
    }

    async updatePayment(id: string, payment: Partial<Payment>): Promise<Payment> {
        const response = await api.put(`/payments/${id}`, payment);
        return response.data;
    }

    async createContract(contract: Omit<Contract, 'id'>): Promise<Contract> {
        const response = await api.post('/contracts', contract);
        return response.data;
    }

    async updateContract(id: string, contract: Partial<Contract>): Promise<Contract> {
        const response = await api.put(`/contracts/${id}`, contract);
        return response.data;
    }
}

export const paymentsService = new PaymentsService();
