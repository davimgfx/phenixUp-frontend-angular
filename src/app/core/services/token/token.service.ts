import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor() {}

  getToken(): string | null {
    return localStorage.getItem('token'); // Pega o token do localStorage
  }

  removeToken(): void {
    localStorage.removeItem('token'); // Remove o token do localStorage
  }

  setToken(token: string): void {
    localStorage.setItem('token', token); // Armazena o token no localStorage
  }

  decodeToken(): any {
    const token = this.getToken();
    if (token) {
      try {
        const decoded = jwtDecode(token); // Decodifica o JWT
        return decoded; // Retorna os dados decodificados
      } catch (error) {
        console.error('Erro ao decodificar o token:', error);
        return null; // Caso o token seja inválido ou tenha erro na decodificação
      }
    }
    return null; // Caso não tenha token
  }
}