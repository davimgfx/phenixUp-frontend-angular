import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class KanbanService {
  private baseUrl = 'http://localhost:8080/project';

  constructor(private http: HttpClient) {}

  getAllProjects(token: string, clientId: String): Observable<any> {
    // Criando o cabeçalho com o token
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, // Passando o token para o cabeçalho
    });

    // Passando os cabeçalhos na requisição HTTP
    return this.http.get<any>(`${this.baseUrl}/${clientId}`, { headers });
  }
}
