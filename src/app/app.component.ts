import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true, // Agregar esta línea para que sea un componente independiente
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // Corregir "styleUrl" -> "styleUrls"
})
export class AppComponent {
  title = 'bank-front';
}
