import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from "../../components/button/button.component";
import { InputComponent } from "../../components/input/input.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ButtonComponent, InputComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

}
