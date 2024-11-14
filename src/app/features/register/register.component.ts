import { Component } from '@angular/core';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { InputComponent } from '../../shared/components/inputs/input/input.component';
import { RouterLink } from '@angular/router';
import { FormRegisterComponent } from "../../shared/components/forms/form-auth/form-register/form-register.component";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, ButtonComponent, InputComponent, FormRegisterComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {}
