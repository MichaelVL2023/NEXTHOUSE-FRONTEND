import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MensajeService} from "../../services/mensaje.service";
import {UsuarioService} from "../../services/usuario.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Usuario} from "../../model/usuario";
import {ReservaAlquiler} from "../../model/reserva-alquiler";
import {ReservaAlquilerService} from "../../services/reserva-alquiler.service";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardTitle} from "@angular/material/card";
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from "@angular/material/datepicker";
import {MatFormField, MatHint, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatNativeDateModule, MatOption} from "@angular/material/core";
import {MatSelect} from "@angular/material/select";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-reserva-alquiler',
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
  templateUrl: './reserva-alquiler.component.html',
  styleUrl: './reserva-alquiler.component.css'
})
export class ReservaAlquilerComponent implements OnInit{
 reservaAlquilerForm: FormGroup;
 fb: FormBuilder = inject(FormBuilder);
 reservaAlquilerService: ReservaAlquilerService = inject(ReservaAlquilerService);

 usuarioService: UsuarioService = inject(UsuarioService);
 router: Router = inject(Router);

 edicion:boolean = false;
 route: ActivatedRoute = inject(ActivatedRoute);
 id:number = 0

 public idUsuarioSeleccionado: number =0;
 lista : Usuario[]=[];
 usuario: Usuario = new Usuario();

 constructor() {
   console.log("Constructor ReservaAlquilerNuevoEdicion")
   this.reservaAlquilerForm = this.fb.group({
     idReserva: [''],
     fechaInicio:['',Validators.required],
     fechaFin: ['',Validators.required],
     precioMensual:['',Validators.required],
     estado:['',Validators.required],
     usuario:['',Validators.required],
   })
 }
 ngOnInit() {
   this.route.params.subscribe((data:Params): void =>{
     console.log("ngOnInit de ReservaAlquilerEditComponent")
     console.log(data);
     this.id = data['id'];
     this.edicion = data['id'] != null;
     this.cargaForm();
   })
   this.loadLista();
 }
 private cargaForm(): void{
   if(this.edicion){
     this.reservaAlquilerService.listId(this.id).subscribe({
       next: (data: ReservaAlquiler):void=>{
         console.log(data);
         this.reservaAlquilerForm.patchValue({
           idReserva: data.idReserva,
           fechaInicio:data.fechaInicio,
           fechaFin: data.fechaFin,
           precioMensual:data.precioMensual,
           estado:data.estado,
           usuario:data.usuario.idUsuario,
         })
       },
       error: (err) => console.error("Error al cargar reserva de alquiler", err)
     })
   }
 }
 loadLista():void{
   this.usuarioService.list().subscribe({
     next: (data)=>this.lista= data,
     error:(err)=>console.error("Error en consulta",err)
   })
 }
 onSubmit(){
   if(this.reservaAlquilerForm.valid){
     const reservaAlquiler: ReservaAlquiler = new ReservaAlquiler();
     reservaAlquiler.idReserva=this.edicion ? this.id: 0;
     reservaAlquiler.fechaInicio= this.reservaAlquilerForm.value.fechaInicio;
     reservaAlquiler.fechaFin= this.reservaAlquilerForm.value.fechaFin;
     reservaAlquiler.precioMensual= this.reservaAlquilerForm.value.precioMensual;
     reservaAlquiler.estado= this.reservaAlquilerForm.value.estado;
     reservaAlquiler.usuario=this.usuario;
     reservaAlquiler.usuario.idUsuario = this.reservaAlquilerForm.value.usuario;
     if(!this.edicion){
       this.reservaAlquilerService.insert(reservaAlquiler).subscribe(():void => this.actualizarLista());
     }else{
       this.reservaAlquilerService.update(reservaAlquiler).subscribe(():void => this.actualizarLista());
     }
     this.router.navigate(['reservas-alquilers/nuevo']);
     alert("Registro ok");
   }else {
     console.log("Formulario no válido");
   }
 }
 private actualizarLista():void{
   this.reservaAlquilerService.list().subscribe(data  =>{
     this.reservaAlquilerService.setList(data);
   })
 }

}
