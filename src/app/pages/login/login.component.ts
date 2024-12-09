import { Component, inject } from '@angular/core';

import { FormLoginComponent } from '../../shared/components/forms/form-auth/form-login/form-login.component';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { AuthGoogleService } from '../../core/services/auth-google/auth-google.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormLoginComponent, NavbarComponent, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {}
