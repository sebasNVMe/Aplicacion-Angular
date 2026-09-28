import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './header/header';
import { Navbar } from './navbar/navbar';
import { Carrusel } from './carrusel/carrusel';
import { Medicos } from './medicos/medicos';
import { Formulario } from './formulario/formulario';
import { Footer } from './footer/footer';

@Component({
  imports: [RouterOutlet, Header, Navbar, Carrusel, Medicos, Formulario, Footer],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  title = 'Practica Angular';
}
