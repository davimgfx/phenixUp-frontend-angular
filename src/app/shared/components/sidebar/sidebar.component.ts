import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { ProjectOptionsMenuComponent } from './project-options-menu/project-options-menu.component';
import { KanbanService } from '../../../core/services/kanban/kanban.service';
import { TokenService } from '../../../core/services/token/token.service';
import { catchError, finalize, of, tap } from 'rxjs';
import { ModalChooseProjectComponent } from "./modal-choose-project/modal-choose-project.component";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    ProjectOptionsMenuComponent,
    ModalChooseProjectComponent,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  @Input() projectName: string | undefined = '';
  @Input() projectDescription: string | undefined = '';
  @Input() projectColor1: string | undefined = '';
  @Input() projectColor2: string | undefined = '';

  @Output() closeModal = new EventEmitter<void>();

  isOpenModalChooseProject = false;

  constructor(
    public kanbanService: KanbanService,
    public tokenService: TokenService,
    private elementRef: ElementRef
  ) {}
  isModalManyOptions = false;

  toggleModal(): void {
    this.isModalManyOptions = !this.isModalManyOptions;
  }

  onModalClose(): void {
    this.isModalManyOptions = false;
  }

  private handleClickOutside = (event: Event): void => {
    const targetElement = event.target as HTMLElement;
    const clickedInside = this.elementRef.nativeElement.contains(targetElement);
    if (!clickedInside) {
      this.closeModal.emit();
    }
  };

  openModalChooseProject(): void {
    this.isOpenModalChooseProject = true;
  }

  closeModalChooseProject(): void {
    this.isOpenModalChooseProject = false;
  }

  ngOnDestroy(): void {
    document.removeEventListener('click', this.handleClickOutside);
  }

  ngOnInit(): void {
    document.addEventListener('click', this.handleClickOutside);
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
