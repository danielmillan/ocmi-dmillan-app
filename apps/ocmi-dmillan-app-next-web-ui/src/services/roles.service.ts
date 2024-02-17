import { API_ENDPOINTS } from '../data/constants';
import { Prisma } from '@ocmi-dmillan-app/ocmi-dmillan-prisma-client';
import fetch from './instance';

export class RolesService {
  public static async createRole(role: Prisma.RolesUncheckedCreateInput) {
    return fetch.post(`${API_ENDPOINTS.ROLES}`, { data: role });
  }

  public static async getRoles() {
    return fetch.get(`${API_ENDPOINTS.ROLES}`);
  }
}
