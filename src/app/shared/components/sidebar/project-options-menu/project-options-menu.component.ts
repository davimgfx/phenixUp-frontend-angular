import {
  Component,
  ElementRef,
  HostListener,
  Output,
  EventEmitter,
} from '@angular/core';
import { ModalColorsProjectComponent } from '../modal-colors-project/modal-colors-project.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-project-options-menu',
  standalone: true,
  imports: [ModalColorsProjectComponent, CommonModule],
  templateUrl: './project-options-menu.component.html',
  styleUrl: './project-options-menu.component.css',
})
export class ProjectOptionsMenuComponent {
  @Output() closeModal = new EventEmitter<void>(); // Emissor para fechar o modal

  constructor(private elementRef: ElementRef) {}

  isOpenModalColorsProject = false;

  private handleClickOutside = (event: Event): void => {
    const targetElement = event.target as HTMLElement;
    const clickedInside = this.elementRef.nativeElement.contains(targetElement);
    if (!clickedInside) {
      this.closeModal.emit();
    }
  };

  ngOnInit(): void {
    document.addEventListener('click', this.handleClickOutside);
  }

  ngOnDestroy(): void {
    document.removeEventListener('click', this.handleClickOutside);
  }

  openModalColorsProject(): void {
    this.isOpenModalColorsProject = true;
  }

  closeModalColorsProject(): void {
    this.isOpenModalColorsProject = false;
  }
}
