import { API_ENDPOINTS } from '../data/constants';
import { Credentials } from '../types/Credentials';
import fetch from './instance';

export class AuthService {
  public static async authenticate(credentials: Credentials) {
    return fetch.post(`${API_ENDPOINTS.AUTH}/login`, { data: credentials });
  }

  public static async validateSession() {
    return fetch.get(`${API_ENDPOINTS.AUTH}/validate`);
  }
}
