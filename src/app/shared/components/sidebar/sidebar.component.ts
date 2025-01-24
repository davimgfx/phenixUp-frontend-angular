import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, Input } from '@angular/core';
import { ProjectOptionsMenuComponent } from './project-options-menu/project-options-menu.component';

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

  isModalOpen = false;

  toggleModal(): void {
    this.isModalOpen = !this.isModalOpen;
  }

  onModalClose(): void {
    this.isModalOpen = false;
  }
}
