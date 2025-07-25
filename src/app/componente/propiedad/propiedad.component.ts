import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatCard, MatCardContent, MatCardTitle} from "@angular/material/card";
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from "@angular/material/datepicker";
import {MatFormField, MatHint, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatSelect} from "@angular/material/select";
import {MatNativeDateModule, MatOption} from "@angular/material/core";
import {NgForOf} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {UsuarioService} from "../../services/usuario.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Usuario} from "../../model/usuario";
import {ReservaAlquiler} from "../../model/reserva-alquiler";
import {PropiedadService} from "../../services/propiedad.service";
import {UbicacionService} from "../../services/ubicacion.service";
import {Ubicacion} from "../../model/ubicacion";
import {Propiedad} from "../../model/propiedad";

@Component({
  selector: 'app-propiedad',
  standalone: true,
  imports: [ FormsModule,
    MatCard,
    MatCardContent,
    MatCardTitle,
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatFormField,
    MatHint,
    MatInput,
    MatLabel,
    MatSuffix,
    ReactiveFormsModule,
    MatSelect,
    MatOption,
    NgForOf,
    MatButton,
    MatDatepickerModule,
    MatNativeDateModule,],
  templateUrl: './propiedad.component.html',
  styleUrl: './propiedad.component.css'
})
export class PropiedadComponent implements  OnInit{
  propiedadForm: FormGroup;
  fb: FormBuilder=inject(FormBuilder);
  propiedadService: PropiedadService = inject(PropiedadService);

  usuarioService:UsuarioService=inject(UsuarioService);
  ubicacionService:UbicacionService=inject(UbicacionService);

  router: Router = inject(Router);



  edicion: boolean = false;
  route:ActivatedRoute = inject(ActivatedRoute)
  id: number = 0


  public idUsuarioSeleccionado: number = 0;
  listaUsuario: Usuario[] = [];
  usuario: Usuario = new Usuario();

  public idUbicacionSeleccionado: number = 0;
  listUbicacion: Ubicacion[] = [];
  ubicacion: Ubicacion = new Ubicacion();

  constructor() {
    console.log("Contructor MensajeNuevoEditComponent")
    this.propiedadForm = this.fb.group({
      idPropiedad: [''],
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: ['', Validators.required],
      tipo: ['', Validators.required],
      estado: ['', Validators.required],
      fechaPublicacion: ['', Validators.required],
      descripcionUsuario: ['', Validators.required],
      ubicacion: ['', Validators.required],
      usuario: ['', Validators.required],
    })
  }
  ngOnInit(): void {
    this.route.params.subscribe((data:Params): void => {
      console.log("ngOnInit de PropiedadNuevoEditComponent")
      console.log(data);
      this.id = data['id']; //capturando el id del listado
      this.edicion = data['id']!= null;//true, false
      this.cargaForm();
    });
    this.loadListaUsuarios();
    this.loadListaUbicaciones();
  }
  private cargaForm(): void {
    if(this.edicion){
      this.propiedadService.listId(this.id).subscribe({
        next: (data: Propiedad):void => {
          console.log(data);
          this.propiedadForm.patchValue({
            idPropiedad: data.idPropiedad,
            titulo: data.titulo,
            descripcion: data.descripcion,
            precio: data.precio,
            tipo: data.tipo,
            estado: data.estado,
            fechaPublicacion: data.fechaPublicacion,
            descripcionUsuario: data.descripcionUsuario,

            usuario: data.usuario,
            ubicacion: data.ubicacion,

          });
        },
        error: (err) => console.error("Error al cargar reserva de alquiler", err) // Muestra el error en la consola
      })
    }
  }


  loadListaUsuarios(): void {
    this.usuarioService.list().subscribe({
      next: (data) => this.listaUsuario = data,
      error: (err) => console.error("Error en consulta de usuarios", err)
    });
  }

  loadListaUbicaciones(): void {
    this.ubicacionService.list().subscribe({
      next: (data) => this.listUbicacion = data,
      error: (err) => console.error("Error en consulta de ubicaciones", err)
    });


  }
  onSubmit() {
    if (this.propiedadForm.valid) {
      const propiedad: Propiedad = new Propiedad();
      propiedad.idPropiedad = this.edicion ? this.id : 0;
      propiedad.titulo = this.propiedadForm.value.titulo;
      propiedad.descripcion = this.propiedadForm.value.descripcion;
      propiedad.precio = this.propiedadForm.value.precio;
      propiedad.tipo = this.propiedadForm.value.tipo;
      propiedad.estado = this.propiedadForm.value.estado;
      propiedad.descripcionUsuario = this.propiedadForm.value.descripcionUsuario;
      propiedad.fechaPublicacion = this.propiedadForm.value.fechaPublicacion;

      propiedad.usuario=this.usuario;
      propiedad.usuario.idUsuario = this.propiedadForm.value.usuario;

      propiedad.ubicacion=this.ubicacion;
      propiedad.ubicacion.idUbicacion = this.propiedadForm.value.ubicacion;

      if (!this.edicion) {
        this.propiedadService.insert(propiedad).subscribe(() => this.actualizaLista());
      } else {
        this.propiedadService.update(propiedad).subscribe(() => this.actualizaLista());
      }
      this.router.navigate(['propiedad/nuevo']);
      alert("Registro ok")
    } else {
      console.log("Formulario no válido");
    }
  }
  private actualizaLista(): void {
    this.propiedadService.list().subscribe(data => {
      this.propiedadService.setList(data);
    });
  }
}
