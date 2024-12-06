import { Component, inject } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { AuthGoogleService } from '../../services/auth-google/auth-google.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-kanban',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './kanban.component.html',
  styleUrl: './kanban.component.css',
})
export class KanbanComponent {
  private authService = inject(AuthGoogleService);

  userProfile: any;

  decodedToken: string | null = null;
  ngOnInit(): void {
    if (this.authService.identityClaims) {
      this.authService.userProfile.subscribe((profile) => {
        console.log(profile);
        this.userProfile = profile;
        this.authService.saveToLocalStorage(profile);
      });
    }
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

  get isLoggedIn() {
    return !!this.authService.identityClaims;
  }

  logoutWithGoogle() {
    this.authService.logout();
  }
}
