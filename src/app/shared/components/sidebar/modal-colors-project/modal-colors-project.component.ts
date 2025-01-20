import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { ColorPickerModule } from 'ngx-color-picker';

@Component({
  selector: 'app-modal-colors-project',
  standalone: true,
  imports: [ColorPickerModule, CommonModule],
  templateUrl: './modal-colors-project.component.html',
  styleUrl: './modal-colors-project.component.css',
})
export class ModalColorsProjectComponent {
  color1: string = '#000000';
  color2: string = '#000000';
  savedColors: { color1: string; color2: string } | null = null;
  isPickerOpen: boolean = true;
  isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  onColorChange(colorName: string, newColor: string): void {}

  onSubmitted(): void {
    console.log('Color1:', this.color1);
    console.log('Color2:', this.color2);
    console.log('Colors submitted');
  }

}
