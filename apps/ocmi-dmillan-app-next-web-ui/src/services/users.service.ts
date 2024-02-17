import { API_ENDPOINTS } from '../data/constants';
import { Users } from '@ocmi-dmillan-app/ocmi-dmillan-prisma-client';
import fetch from './instance';

export class UsersService {
  public static async createUser(user: Users) {
    return fetch.post(`${API_ENDPOINTS.USERS}`, { data: user });
  }

  public static async getUsers() {
    return fetch.get(`${API_ENDPOINTS.USERS}`);
  }
}
