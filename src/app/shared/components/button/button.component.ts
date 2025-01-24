import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

type ButtonWidth = 'full' | 'auto';

type ButtonVariant = 'container' | 'outline' | 'text' | 'normal';

type ButtonType = 'button' | 'submit' | 'reset';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class ButtonComponent {
  @Input() label: string = 'Button';
  @Input() variant: ButtonVariant = 'container';
  @Input() width: ButtonWidth = 'auto';
  @Input() type: ButtonType = 'button';
}
