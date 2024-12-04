import { Component, inject } from '@angular/core';
import { ButtonComponent } from '../../../button/button.component';
import { InputOTPComponent } from '../../../inputs/input-otp/input-otp.component';
import { InputComponent } from '../../../inputs/input/input.component';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-form-login',
  standalone: true,
  imports: [
    ButtonComponent,
    InputOTPComponent,
    InputComponent,
    RouterLink,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './form-login.component.html',
  styleUrl: '../form-auth.component.css',
})
export class FormLoginComponent {
  currentStep: number = 1;
  fb = inject(NonNullableFormBuilder);

  form = this.fb.group({
    email: this.fb.control(''),
    token: this.fb.control(''),
  });

  http = inject(HttpClient);

  nextStep(): void {
    if (this.currentStep < 2) {
      this.createTokenByEmail();
      this.currentStep++;
    }
  }

  previousStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  onSubmit(): void {
  }

  ngOnInit(): void {}

  createTokenByEmail(): void {
    this.http
    .post('http://localhost:8080/auth/login/token', {
      "email": this.form.value.email
    })
    .subscribe((user) => console.log(user));
  }
}
