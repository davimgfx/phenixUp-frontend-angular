import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class KanbanService {
  private baseUrl = 'http://localhost:8080/project';

  // O token pode ser um valor fixo ou recuperado de algum lugar
  private static readonly TOKEN =
    'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwczovL2V4YW1wbGUuY29tL2lzc3VlciIsImV4cCI6MTczNDA0MzA1OSwidXBuIjoiYWRtaW5AZ21haWwuY29tIiwibmFtZSI6ImFkbWluIiwiZ3JvdXBzIjpbIlVzZXIiXSwiaWF0IjoxNzMzOTU2NjU5LCJqdGkiOiJmYzA0ZGVjMC0xYzkzLTQ1ZjQtYTRiOC0yN2EwYzJmMWMzZjcifQ.hRpulCOY8MTXkC4CmDKrEals0DvR9glPf7qoW0IdsmyPwbzZ9Y7UlzWKBs0U-hQPERKlls3Tmq3uayaFZ2xKhVRq7UPtMmDc0krtMhjHsOo70jSYmi_FZwTNnFw7Jx4T_UtZJliTCxY6HEzctibtjVowXfYf-g002bC1widrxutikswlgc1YOQ4Qp10GQKFcZom9b8NHCwYt7kUAL2a1Mv8GmiNlsDZQofRT80LkiGfgQx6WF9-8Yc120gkPdayxL3JtemYDAG9urg61-sgyC72htX-16cO_iEgQG6mXABCmelupXlqwQXz1q99g6v-nqVA1RofmKm7ja1XobktD1Q';

  constructor(private http: HttpClient) {}

  getAllProjects(): Observable<any> {
    // Criando o cabeçalho com o token
    const headers = new HttpHeaders({
      Authorization: KanbanService.TOKEN, // Passando o token para o cabeçalho
    });

    // Passando os cabeçalhos na requisição HTTP
    return this.http.get<any>(`${this.baseUrl}`, { headers });
  }
}
