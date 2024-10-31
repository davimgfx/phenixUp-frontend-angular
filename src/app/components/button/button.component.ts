import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

type ButtonVariant = 'container' | 'outline' | 'text';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})


export class ButtonComponent {
  @Input() label: string = 'Button'; 
  @Input() variant: ButtonVariant = 'container';
}