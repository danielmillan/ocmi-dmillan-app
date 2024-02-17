import { API_ENDPOINTS } from '../data/constants';
import { Customers } from '@ocmi-dmillan-app/ocmi-dmillan-prisma-client';
import fetch from './instance';

export class CustomersService {
  public static async createCustomer(customer: Customers) {
    return fetch.post(`${API_ENDPOINTS.CUSTOMERS}`, { data: customer });
  }

  public static async getCustomers() {
    return fetch.get(`${API_ENDPOINTS.CUSTOMERS}`);
  }
}
