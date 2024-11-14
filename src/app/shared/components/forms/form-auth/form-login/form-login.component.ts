import { Component } from '@angular/core';
import { ButtonComponent } from '../../../button/button.component';
import { InputOTPComponent } from '../../../inputs/input-otp/input-otp.component';
import { InputComponent } from '../../../inputs/input/input.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-form-login',
  standalone: true,
  imports: [ButtonComponent, InputOTPComponent, InputComponent, RouterLink],
  templateUrl: './form-login.component.html',
  styleUrl: '../form-auth.component.css',
})
export class FormLoginComponent {}
