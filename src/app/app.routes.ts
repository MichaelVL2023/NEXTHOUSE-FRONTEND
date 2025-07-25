import { Routes } from '@angular/router';
import {HomeComponent} from "./componente/home/home.component";
import {AcercaComponent} from "./componente/acerca/acerca.component";
import {OpcionesPagoListarComponent} from "./componente/opciones-pago-listar/opciones-pago-listar.component";
import {OpcionesPagoNuevoEditComponent} from "./componente/opciones-pago-nuevo-edit/opciones-pago-nuevo-edit.component";
import {UsuarioComponent} from "./componente/usuario/usuario.component";
import {UsuarioListarComponent} from "./componente/usuario-listar/usuario-listar.component";
import {MensajeListarComponent} from "./componente/mensaje-listar/mensaje-listar.component";
import {MensajeComponent} from "./componente/mensaje/mensaje.component";
import {UbicacionListarComponent} from "./componente/ubicacion-listar/ubicacion-listar.component";
import {UbicacionComponent} from "./componente/ubicacion/ubicacion.component";
import {ReservaAlquilerComponent} from "./componente/reserva-alquiler/reserva-alquiler.component";
import {ReservaAlquilerListarComponent} from "./componente/reserva-alquiler-listar/reserva-alquiler-listar.component";
import {PropiedadListarComponent} from "./componente/propiedad-listar/propiedad-listar.component";
import {PropiedadComponent} from "./componente/propiedad/propiedad.component";
import {PagoListarComponent} from "./componente/pago-listar/pago-listar.component";
import {PagoComponent} from "./componente/pago/pago.component";
import {ComentarioListarComponent} from "./componente/comentario-listar/comentario-listar.component";
import {ComentarioComponent} from "./componente/comentario/comentario.component";
import {LoginComponent} from './componente/login/login.component';

import {ReportesComponent} from './componente/reportes/reportes.component';
import {OpcionesPagoQuery1Component} from './componente/reportes/opciones-pago-query1/opciones-pago-query1.component';
import {Query2Component} from './componente/reportes/propiedad-query2/propiedad-query2.component';
import {Query4Component} from './componente/reportes/propiedad-query4/propiedad-query4.component';
import {PagoQuery5Component} from './componente/reportes/pago-query5/pago-query5.component';
import {PropiedadQuery6Component} from './componente/reportes/propiedad-query6/propiedad-query6.component';
import {PropiedadQuery7Component} from './componente/reportes/propiedad-query7/propiedad-query7.component';
import {ComentarioQuery8Component} from './componente/reportes/comentario-query8/comentario-query8.component';
import {ReservaQuery3Component} from './componente/reportes/reserva-query3/reserva-query3.component';


export const routes: Routes = [
    { path: '', component: HomeComponent, pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'acerca', component: AcercaComponent },

    // Rutas para Opciones de Pago
    { path: 'opciones-pago', component: OpcionesPagoListarComponent }, // Listado
    { path: 'opciones-pago/nuevo', component: OpcionesPagoNuevoEditComponent }, // Nuevo
    { path: 'opciones-pago-nuevo-edit/:id', component: OpcionesPagoNuevoEditComponent }, // Editar



    // Rutas para Usuarios

    { path: 'usuarios', component: UsuarioListarComponent }, // Listado de Usuarios
    { path: 'usuarios/nuevo', component: UsuarioComponent }, // Nuevo Usuario
    { path: 'usuarios-nuevo-edit/:id', component: UsuarioComponent }, // Editar Usuario

      // Rutas para Mensaje

    { path: 'mensajes', component: MensajeListarComponent }, // Listado de Mensaje
    { path: 'mensajes/nuevo', component: MensajeComponent }, // Nuevo Mensaje
    { path: 'mensajes-nuevo-edit/:id', component: MensajeComponent }, // Editar Mensaje

    // Rutas para Ubicacion

    { path: 'ubicaciones', component: UbicacionListarComponent },
    { path: 'ubicaciones/nuevo', component: UbicacionComponent },
    { path: 'ubicaciones-nuevo-edit/:id', component: UbicacionComponent },

    // Rutas para Reserva Alquiler

    { path: 'reservas-alquilers', component: ReservaAlquilerListarComponent }, // Listado de Ubicacion
    { path: 'reservas-alquilers/nuevo', component: ReservaAlquilerComponent }, // Nuevo Ubicacion
    { path: 'reservas-alquilers-nuevo-edit/:id', component: ReservaAlquilerComponent }, // Editar Ubicacion

     // Rutas para Propiedad

    { path: 'propiedades', component: PropiedadListarComponent }, // Listado de Ubicacion
    { path: 'propiedades/nuevo', component: PropiedadComponent }, // Nuevo Ubicacion
    { path: 'propiedades-edit/:id', component: PropiedadComponent }, // Editar Ubicacion


    // Rutas para Pago
    {path: 'pagos', component: PagoListarComponent}, // Listado de Pago
    {path: 'pagos/nuevo', component: PagoComponent}, // Nuevo Pago
    {path: 'pagos-edit/:id', component: PagoComponent}, // Editar Pago


    // Rutas para Comentario

    { path: 'comentarios', component: ComentarioListarComponent }, // Listado de Ubicacion
    { path: 'comentarios/nuevo', component: ComentarioComponent }, // Nuevo Ubicacion
    { path: 'comentarios-edit/:id', component: ComentarioComponent }, // Editar Ubicacion

    // Rutas para Login
    {path: 'login', component: LoginComponent},

   // Reportes
    {path: 'reportes', component: ReportesComponent}, // Listado
    {path: 'reportes/opciones-pago-query1', component: OpcionesPagoQuery1Component}, // Query1
    {path: 'reportes/propiedad-query2', component: Query2Component}, // Query2
    {path: 'reportes/reserva-query3', component: ReservaQuery3Component}, // Query4
    {path: 'reportes/propiedad-query4', component: Query4Component}, // Query4
    {path: 'reportes/pago-query5', component: PagoQuery5Component}, // Query5
    {path: 'reportes/propiedad-query6', component: PropiedadQuery6Component}, // Query6
    {path: 'reportes/propiedad-query7', component: PropiedadQuery7Component}, // Query7
    {path: 'reportes/comentario-query8', component: ComentarioQuery8Component} // Query8

];
