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
import {PropiedadService} from "../../services/propiedad.service";
import {UsuarioService} from "../../services/usuario.service";
import {UbicacionService} from "../../services/ubicacion.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Usuario} from "../../model/usuario";
import {Ubicacion} from "../../model/ubicacion";
import {Propiedad} from "../../model/propiedad";
import {ComentarioService} from "../../services/comentario.service";
import {Comentario} from "../../model/comentario";

@Component({
  selector: 'app-comentario',
  standalone: true,
  imports: [FormsModule,
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
  templateUrl: './comentario.component.html',
  styleUrl: './comentario.component.css'
})
export class ComentarioComponent  implements  OnInit{
  comentarioForm: FormGroup;
  fb: FormBuilder=inject(FormBuilder);
  comentarioService: ComentarioService = inject(ComentarioService);

  propiedadService:PropiedadService=inject(PropiedadService);
  usuarioService:UsuarioService=inject(UsuarioService);

  router: Router = inject(Router);



  edicion: boolean = false;
  route:ActivatedRoute = inject(ActivatedRoute)
  id: number = 0

  public idPropiedadSeleccionado: number = 0;
  listPropiedad: Propiedad[] = [];
  propiedad: Propiedad = new Propiedad();

  public idUsuarioSeleccionado: number = 0;
  listaUsuario: Usuario[] = [];
  usuario: Usuario = new Usuario();


  constructor() {
    console.log("Contructor MensajeNuevoEditComponent")
    this.comentarioForm = this.fb.group({
      idComentario: [''],
      calificacion: ['', Validators.required],
      tipoUsuario: ['', Validators.required],
      fechaComentario: ['', Validators.required],
      comentario: ['', Validators.required],
      propiedad: ['', Validators.required],
      usuario: ['', Validators.required],
    })
  }
  ngOnInit(): void {
    this.route.params.subscribe((data:Params): void => {
      console.log("ngOnInit de ComentarioNuevoEditComponent")
      console.log(data);
      this.id = data['id']; //capturando el id del listado
      this.edicion = data['id']!= null;//true, false
      this.cargaForm();
    });
    this.loadListaPropiedad();
    this.loadListaUsuarios();
  }
  private cargaForm(): void {
    if(this.edicion){
      this.comentarioService.listId(this.id).subscribe({
        next: (data: Comentario):void => {
          console.log(data);
          this.comentarioForm.patchValue({
            idComentario: data.idComentario,
            calificacion: data.calificacion,
            tipoUsuario: data.tipoUsuario,
            fechaComentario: data.fechaComentario,
            comentario: data.comentario,

            propiedad: data.propiedad,
            usuario: data.usuario,

          });
        },
        error: (err) => console.error("Error al cargar reserva de alquiler", err) // Muestra el error en la consola
      })
    }
  }

  loadListaPropiedad(): void {
    this.propiedadService.list().subscribe({
      next: (data) => this.listPropiedad = data,
      error: (err) => console.error("Error en consulta de Propiedad", err)
    });
  }

  loadListaUsuarios(): void {
    this.usuarioService.list().subscribe({
      next: (data) => this.listaUsuario = data,
      error: (err) => console.error("Error en consulta de usuarios", err)
    });
  }


  onSubmit() {
    if (this.comentarioForm.valid) {
      const comentario: Comentario = new Comentario();
      comentario.idComentario = this.edicion ? this.id : 0;
      comentario.calificacion = this.comentarioForm.value.calificacion;
      comentario.tipoUsuario = this.comentarioForm.value.tipoUsuario;
      comentario.fechaComentario = this.comentarioForm.value.fechaComentario;
      comentario.comentario = this.comentarioForm.value.comentario;
      comentario.propiedad = this.propiedad;
      comentario.propiedad.idPropiedad=this.comentarioForm.value.propiedad;
      comentario.usuario=this.usuario;
      comentario.usuario.idUsuario = this.comentarioForm.value.usuario;


      if (!this.edicion) {
        this.comentarioService.insert(comentario).subscribe(() => this.actualizaLista());
      } else {
        this.comentarioService.update(comentario).subscribe(() => this.actualizaLista());
      }
      this.router.navigate(['comentario/nuevo']);
      alert("Registro ok");
    } else {
      console.log("Formulario no válido");
    }
  }
  private actualizaLista(): void {
    this.comentarioService.list().subscribe(data => {
      this.comentarioService.setList(data);
    });
  }
}
