import { Component } from '@angular/core';
import { ButtonComponent } from "../../../button/button.component";
import { InputComponent } from "../../../inputs/input/input.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-form-register',
  standalone: true,
  imports: [ButtonComponent, InputComponent, RouterLink],
  templateUrl: './form-register.component.html',
  styleUrl: '../form-auth.component.css'
})
export class FormRegisterComponent {

}
