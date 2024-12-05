import { Component, inject } from '@angular/core';

import { FormLoginComponent } from '../../shared/components/forms/form-auth/form-login/form-login.component';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { AuthGoogleService } from '../../services/auth-google/auth-google.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormLoginComponent, NavbarComponent, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private authService = inject(AuthGoogleService);

  userProfile: any;

  signInWithGoogle() {
    this.authService.login();
  }

  ngOnInit() {
    if (this.authService.identityClaims) {
      this.authService.userProfile.subscribe((profile) => {
        this.userProfile = profile;
      });
    }
  }

  get isLoggedIn() {
    return !!this.authService.identityClaims;
  }

  logoutWithGoogle() {
    this.authService.logout();
  }
}
