import { Component, inject } from '@angular/core';
import { ButtonComponent } from '../../../button/button.component';
import { InputComponent } from '../../../inputs/input/input.component';
import { Router, RouterLink } from '@angular/router';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthGoogleService } from '../../../../../core/services/auth-google/auth-google.service';
import { CommonModule } from '@angular/common';

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

  currentStep: number = 1;

  form = this.fb.group({
    name: this.fb.control(''),
    email: this.fb.control(''),
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
        console.log(user);
        document.cookie = `name=${user.name}; path=/;`;
        document.cookie = `email=${user.email}; path=/;`;
        document.cookie = `token=${user.token}; path=/;`;

        localStorage.setItem('name', user?.name);
        localStorage.setItem('email', user?.email);
        localStorage.setItem('token', user?.token);

        this.form.value.name = '';
        this.form.value.email = '';
        this.router.navigate(['/kanban']);
      });
  }

  signInWithGoogle() {
    this.authService.login();
  }
}
