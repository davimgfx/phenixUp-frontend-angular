import { Component, inject } from '@angular/core';
import { ButtonComponent } from '../../../button/button.component';
import { InputOTPComponent } from '../../../inputs/input-otp/input-otp.component';
import { InputComponent } from '../../../inputs/input/input.component';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthGoogleService } from '../../../../../core/services/auth-google/auth-google.service';

interface IUser {
  email: string;
  token: string;
}

@Component({
  selector: 'app-form-login',
  standalone: true,
  imports: [
    ButtonComponent,
    InputComponent,
    RouterLink,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './form-login.component.html',
  styleUrl: '../form-auth.component.css',
})
export class FormLoginComponent {
  router = inject(Router);
  fb = inject(NonNullableFormBuilder);
  http = inject(HttpClient);
  authService = inject(AuthGoogleService);

  currentStep: number = 1;

  form = this.fb.group({
    email: this.fb.control(''),
    token: this.fb.control(''),
  });

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

  sendAgainToken(): void {
    this.createTokenByEmail();
  }

  onSubmit(): void {
    this.http
      .post<IUser>('http://localhost:8080/auth/login', {
        email: this.form.value.email,
        token: this.form.value.token,
      })
      .subscribe((user) => {
        document.cookie = `email=${user.email}; path=/;`;
        document.cookie = `token=${user.token}; path=/;`;

        localStorage.setItem('email', user?.email);
        localStorage.setItem('token', user?.token);
        console.log(user);

        this.router.navigate(['/kanban']);
      });
  }

  createTokenByEmail(): void {
    this.http
      .post('http://localhost:8080/auth/login/token', {
        email: this.form.value.email,
      })
      .subscribe((user) => console.log(user));
  }

  userProfile: any;

  signInWithGoogle() {
    this.authService.login();
  }

  ngOnInit() {
    if (this.authService.identityClaims) {
      this.authService.userProfile.subscribe((profile) => {
        this.authService.saveToLocalStorage(profile);
        console.log(profile);
        this.userProfile = profile;
        this.router.navigate(['/kanban']);
      });
    }
  }
}
