import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ColorPickerModule } from 'ngx-color-picker';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ColorPickerModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'PhenixUp - Better than ClickUp';
}
