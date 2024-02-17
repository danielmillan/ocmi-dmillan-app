import { API_ENDPOINTS } from '../data/constants';
import { Prisma } from '@ocmi-dmillan-app/ocmi-dmillan-prisma-client';
import fetch from './instance';

export class EmployeesService {
  public static async createEmployee(
    employee: Prisma.EmployeesUncheckedCreateInput
  ) {
    return fetch.post(`${API_ENDPOINTS.EMPLOYEES}`, { data: employee });
  }

  public static async getEmployees() {
    return fetch.get(`${API_ENDPOINTS.EMPLOYEES}`);
  }

  public static async getPaymentTypes() {
    return fetch.get(`${API_ENDPOINTS.EMPLOYEES}/catalogs/payment/types`);
  }

  public static async updateEmployee(
    id: string,
    employee: Prisma.EmployeesUncheckedCreateInput
  ) {
    return fetch.put(`${API_ENDPOINTS.EMPLOYEES}/${id}`, { data: employee });
  }

  public static async deleteEmployee(id: string) {
    return fetch.delete(`${API_ENDPOINTS.EMPLOYEES}/${id}`);
  }
}
