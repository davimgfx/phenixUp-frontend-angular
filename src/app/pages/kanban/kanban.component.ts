import { Component, inject } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { AuthGoogleService } from '../../core/services/auth-google/auth-google.service';
import { CommonModule } from '@angular/common';
import { KanbanService } from '../../core/services/kanban/kanban.service';
import { IProject } from '../../core/models/ProjectModels';
import { TokenService } from '../../core/services/token/token.service';

@Component({
  selector: 'app-kanban',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './kanban.component.html',
  styleUrl: './kanban.component.css',
})
export class KanbanComponent {
  // private authService = inject(AuthGoogleService);
  private kanbanService = inject(KanbanService);
  private tokenService = inject(TokenService);
  // userProfile: any;
  loading: boolean = true;
  errorToken: boolean = false;
  projects: IProject[] = [];
  // decodedToken: string | null = null;

  decodedToken: any;

  ngOnInit(): void {
    this.loadProjects();

    const token = this.tokenService.getToken();
    if (token) {
      this.decodedToken = this.tokenService.decodeToken();
      console.log('Token decodificado:', this.decodedToken);
    } else {
      console.log('Nenhum token encontrado no localStorage');
    }

    // if (this.authService.identityClaims) {
    //   this.authService.userProfile.subscribe((profile) => {
    //     console.log(profile);
    //     this.userProfile = profile;
    //     this.authService.saveToLocalStorage(profile);
    //   });
    // }
    // const token = localStorage.getItem('token');

    // if (token) {
    //   try {
    //     this.decodedToken = jwtDecode(token);
    //     console.log('Token Decodificado:', this.decodedToken);
    //   } catch (error) {
    //     console.error('Erro ao decodificar o token:', error);
    //   }
    // } else {
    //   console.warn('Nenhum token encontrado.');
    // }
  }

  // get isLoggedIn() {
  //   return !!this.authService.identityClaims;
  // }

  // logoutWithGoogle() {
  //   this.authService.logout();
  // }

  loadProjects(): void {
    const token = this.tokenService.getToken();

    if (token === null) {
      this.loading = false;
      this.errorToken = true;
    }

    if (token) {
      this.kanbanService.getAllProjects(token, this.tokenService.decodeToken().id).subscribe(
        (data) => {
          this.projects = data; // Atribui os dados dos projetos
          this.loading = false; // Desativa o estado de carregamento quando os dados forem carregados
        },
        (error) => {
          console.error('Erro ao carregar os projetos:', error);
          this.loading = false; // Desativa o estado de carregamento mesmo em caso de erro
        }
      );
    }
  }

  logout(): void {
    this.tokenService.removeToken();
    window.location.href = '/';
  }
}
