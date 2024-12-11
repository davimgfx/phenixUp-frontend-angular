import { Component } from '@angular/core';
import { FormRegisterComponent } from "../../shared/components/forms/form-auth/form-register/form-register.component";
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [NavbarComponent, FormRegisterComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {}
