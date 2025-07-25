import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatCard, MatCardContent, MatCardTitle} from "@angular/material/card";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {MatFormField, MatHint, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatOption, MatSelect} from "@angular/material/select";
import {NgForOf} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {UsuarioService} from "../../services/usuario.service";
import {RolService} from "../../services/rol.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Rol} from "../../model/rol";
import {Usuario} from "../../model/usuario";
@Component({
  selector: 'app-usuario',
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
    MatButton
  ],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css'
})
export class UsuarioComponent implements OnInit {
  usuarioForm: FormGroup;
  fb: FormBuilder = inject(FormBuilder);
  usuarioService: UsuarioService = inject(UsuarioService);

  rolService: RolService = inject(RolService);//agregar rol service
  router: Router = inject(Router);

  edicion: boolean = false;
  route: ActivatedRoute = inject(ActivatedRoute)
  id: number = 0

  public idRolSeleccionado: number = 0;
  lista: Rol[] = [];
  rol: Rol = new Rol();

  constructor() {
    console.log("Constructor UsuarioNuevoEditComponent")
    this.usuarioForm = this.fb.group({
      idUsuario: [''],
      nombreCompleto: ['', Validators.required],
      email: ['', Validators.required],
      telefono: ['', Validators.required],
      contrasena: ['', Validators.required],
      rol: ['', Validators.required],
    })
  }
  ngOnInit(): void { //sólo una vez luego del constructor
    this.route.params.subscribe((data:Params): void =>{
      console.log("ngOnInit de UsuarioNuevoEditComponent")
      console.log(data);
      this.id = data['id']; //capturando el id del listado
      this.edicion = data['id']!= null;//true, false
      this.cargaForm();
    })
    this.loadLista();
  }

  private cargaForm(): void {
    if (this.edicion) {
      this.usuarioService.listId(this.id).subscribe({
        next: (data: Usuario) => {
          console.log(data);
          this.usuarioForm.patchValue({
            nombreCompleto: data.nombreCompleto,
            email: data.email,
            telefono: data.telefono,
            contrasena: data.contrasena,
            rol: data.rol.idRol,
          });
        },
        error: (err) => console.error("Error al cargar usuario", err) // Muestra el error en la consola
      });
    }
  }

  loadLista(): void {
    this.rolService.lis().subscribe({
      next: (data) => this.lista = data,
      error: (err) => console.error("Error en consulta", err)
    })
  }
  onSubmit() {
    if (this.usuarioForm.valid) {
      const usuario: Usuario = new Usuario();
      usuario.idUsuario = this.edicion ? this.id : 0;
      usuario.nombreCompleto = this.usuarioForm.value.nombreCompleto;
      usuario.email = this.usuarioForm.value.email;
      usuario.telefono = this.usuarioForm.value.telefono;
      usuario.contrasena = this.usuarioForm.value.contrasena;
      usuario.rol = this.rol;
      usuario.rol.idRol = this.usuarioForm.value.rol;

      if (!this.edicion) {
        this.usuarioService.insert(usuario).subscribe(() => this.actualizarLista());
      } else {
        this.usuarioService.update(usuario).subscribe(() => this.actualizarLista());
      }

      this.router.navigate(['usuarios/nuevo']);
      alert("Registro ok");
    } else {
      console.log("Formulario no válido");
    }
  }

  private actualizarLista() {
    this.usuarioService.list().subscribe(data => {
      this.usuarioService.setList(data); // Actualizar y notificar a los suscriptores
    });
  }
}
