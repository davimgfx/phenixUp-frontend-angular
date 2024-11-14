import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { InputComponent } from '../../shared/components/inputs/input/input.component';
import { InputOTPComponent } from '../../shared/components/inputs/input-otp/input-otp.component';
import { FormLoginComponent } from "../../shared/components/forms/form-login/form-login.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ButtonComponent, InputComponent, InputOTPComponent, FormLoginComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {}
