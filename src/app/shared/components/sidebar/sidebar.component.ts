import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, Input } from '@angular/core';
import { ProjectOptionsMenuComponent } from './project-options-menu/project-options-menu.component';
import { KanbanService } from '../../../core/services/kanban/kanban.service';
import { TokenService } from '../../../core/services/token/token.service';
import { catchError, finalize, of, tap } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, ProjectOptionsMenuComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  @Input() projectName: string | undefined = '';
  @Input() projectDescription: string | undefined = '';
  @Input() projectColor1: string | undefined = '';
  @Input() projectColor2: string | undefined = '';

  constructor(
    public kanbanService: KanbanService,
    public tokenService: TokenService
  ) {}
  isModalOpen = false;

  toggleModal(): void {
    this.isModalOpen = !this.isModalOpen;
  }

  onModalClose(): void {
    this.isModalOpen = false;
  }

  ngOnInit(): void {
    const token = this.tokenService.getToken();

    if (token) {
      this.kanbanService
        .getAllProjectsInfos(token, this.tokenService.decodeToken().id)
        .pipe(
          tap((data) => {
            console.log(data);
          }),
          catchError((error) => {
            console.error('Erro ao carregar os projetos:', error);
            // Return an empty observable to avoid breaking the stream
            return of([]);
          }),
          finalize(() => {
            // Perform any cleanup or final actions if needed
          })
        )
        .subscribe();
    }
  }
}
