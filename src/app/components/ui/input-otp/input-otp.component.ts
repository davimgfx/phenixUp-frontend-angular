import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-input-otp',
  standalone: true,
  imports: [],
  templateUrl: './input-otp.component.html',
  styleUrl: './input-otp.component.css',
})
export class InputOTPComponent {
  @ViewChildren('otpInput') otpInputs!: QueryList<ElementRef>;

  onInputChange(event: any, index: number) {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    if (value) {
      // Se o valor foi inserido, move para o próximo input
      if (index < this.otpInputs.length - 1) {
        const nextInput = this.otpInputs.toArray()[index + 1].nativeElement;
        nextInput.focus();
      }
    }
  }

  onKeyDown(event: KeyboardEvent, index: number) {
    const input = this.otpInputs.toArray()[index]
      .nativeElement as HTMLInputElement;
    const allowedKeys = [
      'Backspace',
      'ArrowLeft',
      'ArrowRight',
      'Delete',
      'Tab',
    ];

    if (!allowedKeys.includes(event.key) && !/^[0-9]$/.test(event.key)) {
      event.preventDefault();
      return;
    }

    if (event.key === 'Backspace' && !input.value) {
      // Se o valor está vazio e o usuário pressiona "Backspace", move para o input anterior
      if (index > 0) {
        const prevInput = this.otpInputs.toArray()[index - 1].nativeElement;
        prevInput.focus();
      }
    }
  }
}
