import { Component } from '@angular/core';
import {Router, RouterLink, RouterModule, RouterOutlet} from '@angular/router';
import {CommonModule} from "@angular/common";
import {FooterComponent} from "./componente/footer/footer.component";
import {ReactiveFormsModule} from "@angular/forms";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterModule, FooterComponent
    , ReactiveFormsModule, MatDatepickerModule, MatNativeDateModule, MatButton],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'TF-NextHouse-Angel';
  isRegistered: boolean = false;

  showReportQueries: boolean = false;

  constructor(private router: Router) {}

  isOnNewOptionPage(): boolean {
    return this.router.url.includes('opciones-pago/nuevo');
  }

  isOnUserPage(): boolean {
    return this.router.url.includes('usuarios/nuevo');
  }
  isOnMensajePage(): boolean {
    return this.router.url.includes('mensajes/nuevo');
  }
  isOnUbicaiconPage(): boolean {
  return this.router.url.includes('ubicaciones/nuevo');
  }
  isOnReservaAlquilerPage(): boolean {
    return this.router.url.includes('reservas-alquilers/nuevo');
  }
  isOnPropiedadPage(): boolean {
    return this.router.url.includes('propiedades/nuevo');
  }

  isOnPagoPage(): boolean {
    return this.router.url.includes('pagos/nuevo');
  }

  isOnComentarioPage(): boolean {
    return this.router.url.includes('comentarios/nuevo');
  }

  isOnCerrarSesionPage(): boolean {
    sessionStorage.clear();
    return true;
  }
}
