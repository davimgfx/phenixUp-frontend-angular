import { Component } from '@angular/core';
import { ButtonComponent } from "../../../button/button.component";
import { InputComponent } from "../../../inputs/input/input.component";

@Component({
  selector: 'app-form-register',
  standalone: true,
  imports: [ButtonComponent, InputComponent],
  templateUrl: './form-register.component.html',
  styleUrl: '../form-auth.component.css'
})
export class FormRegisterComponent {

}
