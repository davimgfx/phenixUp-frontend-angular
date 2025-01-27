import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  QueryList,
  ViewChildren,
  forwardRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input-otp',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './input-otp.component.html',
  styleUrl: './input-otp.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputOTPComponent),
      multi: true,
    },
  ],
})

export class InputOTPComponent implements ControlValueAccessor {
  @ViewChildren('otpInput') otpInputs!: QueryList<ElementRef>;

  private _value: string = ''; // Agora é uma string completa
  onChange: (value: string) => void = () => {};
  onTouched: () => void = () => {};


  // Implementação de ControlValueAccessor
  writeValue(value: string): void {
    this._value = value || '';
    this.updateInputs();
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.otpInputs.forEach((input) => {
      input.nativeElement.disabled = isDisabled;
    });
  }

  onInputChange(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    if (value && /^[0-9]$/.test(value)) {
      const valueArray = this._value.split('');
      valueArray[index] = value;
      this._value = valueArray.join('');

      this.onChange(this._value); 

      if (index < this.otpInputs.length - 1) {
        const nextInput = this.otpInputs.toArray()[index + 1].nativeElement;
        nextInput.focus();
      }
    }
  }

  onKeyDown(event: KeyboardEvent, index: number): void {
    const input = this.otpInputs.toArray()[index]
      .nativeElement as HTMLInputElement;
    const allowedKeys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Delete', 'Tab'];

    if (!allowedKeys.includes(event.key) && !/^[0-9]$/.test(event.key)) {
      event.preventDefault();
      return;
    }

    if (event.key === 'Backspace' && !input.value) {
      // Remove o valor na posição correspondente
      const valueArray = this._value.split('');
      valueArray[index] = '';
      this._value = valueArray.join('');

      this.onChange(this._value); // Atualiza a string completa

      // Move para o campo anterior, se existir
      if (index > 0) {
        const prevInput = this.otpInputs.toArray()[index - 1].nativeElement;
        prevInput.focus();
      }
    }
  }

  private updateInputs(): void {
    const valueArray = this._value.split('');
    this.otpInputs.forEach((input, index) => {
      input.nativeElement.value = valueArray[index] || '';
    });
  }

  getValueInputOTP(): string {
    return this._value;
  }

}