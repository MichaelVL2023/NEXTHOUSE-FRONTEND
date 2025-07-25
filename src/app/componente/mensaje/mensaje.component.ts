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
import {MatOption, MatSelect} from "@angular/material/select";
import {NgForOf} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {MensajeService} from "../../services/mensaje.service";
import {UsuarioService} from "../../services/usuario.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Usuario} from "../../model/usuario";
import {Mensaje} from "../../model/mensaje";
import {MatNativeDateModule} from "@angular/material/core";
@Component({
  selector: 'app-mensaje',
  standalone: true,
  imports: [
    FormsModule,
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
    MatNativeDateModule,
  ],
  templateUrl: './mensaje.component.html',
  styleUrl: './mensaje.component.css'
})
export class MensajeComponent implements OnInit{
  mensajeForm: FormGroup;
  fb: FormBuilder=inject(FormBuilder);
  mensajeService: MensajeService = inject(MensajeService);


  usuarioService:UsuarioService=inject(UsuarioService);
  router: Router = inject(Router);



  edicion: boolean = false;
  route:ActivatedRoute = inject(ActivatedRoute)
  id: number = 0


  public idUsuarioSeleccionado: number = 0;
  lista: Usuario[] = [];
  usuario: Usuario = new Usuario();

  constructor() {
    console.log("Contructor MensajeNuevoEditComponent")
    this.mensajeForm = this.fb.group({
      idMensaje: [''],
      contenido: ['', Validators.required],
      fechaEnvio: ['', Validators.required],
      tipo: ['', Validators.required],
      usuario: ['', Validators.required],
    })
  }
  ngOnInit(): void {
    this.route.params.subscribe((data:Params): void => {
      console.log("ngOnInit de MensajeNuevoEditComponent")
      console.log(data);
      this.id = data['id']; //capturando el id del listado
      this.edicion = data['id']!= null;//true, false
      this.cargaForm();
    })
    this.loadLista();
  }
  private cargaForm(): void {
    if(this.edicion){
      this.mensajeService.listId(this.id).subscribe({
        next: (data: Mensaje):void => {
          console.log(data);
          this.mensajeForm.patchValue({
            idMensaje: data.idMensaje,
            contenido: data.contenido,
            fechaEnvio: data.fechaEnvio,
            tipo: data.tipo,
            usuario: data.usuario
          });
        },
        error: (err) => console.error("Error al cargar mensaje", err) // Muestra el error en la consola
      })
    }
  }


  loadLista(): void {
    this.usuarioService.list().subscribe({
      next: (data) => this.lista = data,
      error: (err) => console.error("Error en consulta", err)
    })
  }
  onSubmit() {
    if (this.mensajeForm.valid) {
      const mensaje: Mensaje = new Mensaje();
      mensaje.idMensaje = this.edicion ? this.id:0;
      mensaje.contenido = this.mensajeForm.value.contenido;
      mensaje.fechaEnvio = this.mensajeForm.value.fechaEnvio;
      mensaje.tipo = this.mensajeForm.value.tipo;
      mensaje.usuario= this.usuario;
      mensaje.usuario.idUsuario = this.mensajeForm.value.usuario;
       if(!this.edicion){
         this.mensajeService.insert(mensaje).subscribe(():void => this.actualizaLista());
       } else {
         this.mensajeService.update(mensaje).subscribe(():void => this.actualizaLista());
       }
       this.router.navigate(['mensaje/nuevo']);
       alert("Registro ok")
    }else{
      console.log("Formulario no valido")
    }
  }
  private actualizaLista(): void {
    this.mensajeService.list().subscribe(data => {
      this.mensajeService.setList(data);
    })
  }
}
