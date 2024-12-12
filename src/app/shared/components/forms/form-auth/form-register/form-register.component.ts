import { Component, inject } from '@angular/core';
import { ButtonComponent } from '../../../button/button.component';
import { InputComponent } from '../../../inputs/input/input.component';
import { Router, RouterLink } from '@angular/router';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthGoogleService } from '../../../../../core/services/auth-google/auth-google.service';
import { CommonModule } from '@angular/common';
import { TokenService } from '../../../../../core/services/token/token.service';

interface IUser {
  name: string;
  email: string;
  token: string;
}

@Component({
  selector: 'app-form-register',
  standalone: true,
  imports: [
    ButtonComponent,
    InputComponent,
    RouterLink,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './form-register.component.html',
  styleUrl: '../form-auth.component.css',
})
export class FormRegisterComponent {
  router = inject(Router);
  fb = inject(NonNullableFormBuilder);
  http = inject(HttpClient);
  authService = inject(AuthGoogleService);
  tokenService = inject(TokenService);

  currentStep: number = 1;

  form = this.fb.group({
    name: this.fb.control('', { validators: [Validators.required] }),
    email: this.fb.control('', { validators: [Validators.required] }),
  });

  nextStep(): void {
    if (this.currentStep < 2) {
      this.currentStep++;
    }
  }

  previousStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  onSubmit(): void {
    this.http
      .post<IUser>('http://localhost:8080/auth/signup', {
        name: this.form.value.name,
        email: this.form.value.email,
      })
      .subscribe((user) => {
        this.tokenService.setToken(user.token);

        this.form.value.name = '';
        this.form.value.email = '';
        this.router.navigate(['/kanban']);
      });
  }

  signInWithGoogle() {
    this.authService.login();
  }
}
