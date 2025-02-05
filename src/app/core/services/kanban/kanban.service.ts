import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IColorsProject, IKanbanProjects } from './types';

@Injectable({
  providedIn: 'root',
})
export class KanbanService {
  private baseUrl = 'http://localhost:8080/project';

  constructor(private http: HttpClient) {}

  setSelectProjectInLocalStorage(project: IKanbanProjects): void {
    localStorage.setItem('project', JSON.stringify(project));
  }

  getAllProjects(
    token: string,
    clientId: String
  ): Observable<IKanbanProjects[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<IKanbanProjects[]>(`${this.baseUrl}/${clientId}`, {
      headers,
    });
  }

  getAllProjectsInfos(token: string, clientId: String) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<IColorsProject[]>(
      `${this.baseUrl}/projectInfos/${clientId}`,
      {
        headers,
      }
    );
  }

  getProjectColors(token: string, projectId: String) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<IColorsProject>(
      `${this.baseUrl}/projectColor/${projectId}`,
      {
        headers,
      }
    );
  }

  getFirstProjectCreated(token: string, clientId: String) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<IKanbanProjects>(
      `${this.baseUrl}/firstProject/${clientId}`,
      {
        headers,
      })
  }

  updateProjectColors(
    token: string,
    projectId: string,
    color1: string,
    color2: string
  ): Observable<IColorsProject[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    const colorsObject = {
      colorLogo1: color1,
      colorLogo2: color2,
    };

    return this.http.put<IColorsProject[]>(
      `${this.baseUrl}/updateProjectColors/${projectId}`,
      colorsObject,
      {
        headers,
      }
    );
  }

  setIdProjectInLocalStorage(projectId: string): void {
    localStorage.setItem('projectId', projectId);
  }

  getProjectIdInLocalStorage(): string | null {
    return localStorage.getItem('projectId');
  }

   removeProjectIdInLocalStorage(): void {
    localStorage.removeItem('projectId');
   }
}
