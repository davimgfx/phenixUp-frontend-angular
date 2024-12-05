import { Component } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-kanban',
  standalone: true,
  imports: [],
  templateUrl: './kanban.component.html',
  styleUrl: './kanban.component.css'
})
export class KanbanComponent {
  decodedToken: string | null = null;

  ngOnInit(): void {
   
    const token = localStorage.getItem('token');

    if (token) {
      try {
        this.decodedToken = jwtDecode(token);
        console.log('Token Decodificado:', this.decodedToken);
      } catch (error) {
        console.error('Erro ao decodificar o token:', error);
      }
    } else {
      console.warn('Nenhum token encontrado.');
    }
  }
}
