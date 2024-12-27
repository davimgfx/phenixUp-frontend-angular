import {
  Component,
  ElementRef,
  HostListener,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'app-project-options-menu',
  standalone: true,
  imports: [],
  templateUrl: './project-options-menu.component.html',
  styleUrl: './project-options-menu.component.css',
})
export class ProjectOptionsMenuComponent {
  @Output() closeModal = new EventEmitter<void>(); // Emissor para fechar o modal

  constructor(private elementRef: ElementRef) {}

  // @HostListener('document:click', ['$event.target'])
  // onClickOutside(targetElement: HTMLElement): void {
  //   const clickedInside = this.elementRef.nativeElement.contains(targetElement);
  //   if (!clickedInside) {
  //     this.closeModal.emit(); // Emite o evento para fechar o modal
  //   }
  // }

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
}
