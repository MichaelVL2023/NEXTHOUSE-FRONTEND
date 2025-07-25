import {Component, inject, OnInit} from '@angular/core';
import {MatCard, MatCardContent, MatCardTitle} from "@angular/material/card";
import {MatFormField, MatHint, MatLabel} from "@angular/material/form-field";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from "@angular/material/datepicker";
import {MatInput, MatInputModule} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {MatNativeDateModule} from "@angular/material/core";
import {OpcionesPagoService} from "../../services/opciones-pago.service";
import {ActivatedRoute, Router} from "@angular/router";
import {OpcionesPago} from "../../model/opciones-pago";

@Component({
  selector: 'app-opciones-pago-nuevo-edit',
  standalone: true,
  imports: [
    MatCard,
    MatCardTitle,
    MatCardContent, MatLabel, MatHint,
    ReactiveFormsModule,
    MatFormField,
    MatDatepickerInput,
    MatInput,
    MatDatepickerToggle,
    MatDatepicker,
    MatButton,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule
  ],
  templateUrl: './opciones-pago-nuevo-edit.component.html',
  styleUrl: './opciones-pago-nuevo-edit.component.css'
})
export class OpcionesPagoNuevoEditComponent implements OnInit{
  opcionesPagoForm: FormGroup ;
  fb: FormBuilder = inject(FormBuilder);
  opcionesService: OpcionesPagoService = inject(OpcionesPagoService);
  router: Router=inject(Router);
  id: number =0;
  edicion:boolean = false;
  route:ActivatedRoute = inject(ActivatedRoute);


  constructor() {
    console.log("Carga constructor de Form")
    this.opcionesPagoForm = this.fb.group({
      idOppago: [''],
      metodoPago: ['', Validators.required],
      descripcion: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    console.log("Carga ngOnInit de Form")
    this.route.params.subscribe((data) => {
      console.log(data);
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.cargarForm();
    });
  }
  private cargarForm() {
      if(this.edicion){
        this.opcionesService.listID(this.id).subscribe((data:OpcionesPago):void => {
          console.log(data);
          this.opcionesPagoForm.patchValue({
            metodoPago:data.metodoPago,
            descripcion:data.descripcion,
          });
        });
      }
    }
  onSubmit(): void {
    if (this.opcionesPagoForm.valid) {
      const opcionesPago: OpcionesPago = new OpcionesPago();
      opcionesPago.idOppago= this.id;
      opcionesPago.metodoPago= this.opcionesPagoForm.value.metodoPago;
      opcionesPago.descripcion= this.opcionesPagoForm.value.descripcion;

      if (!this.edicion) {
        this.opcionesService.insert(opcionesPago).subscribe((data: Object): void => {
          this.opcionesService.list().subscribe(data => {
            this.opcionesService.setList(data);
          });
        });
      } else {
        this.opcionesService.update(opcionesPago).subscribe((data: Object): void => {
          this.opcionesService.list().subscribe(data => {
            this.opcionesService.setList(data);
          });
        });
      }
      this.router.navigate(['opciones-pago/nuevo']);
      alert("Registo ok");
    } else {
      console.log("Formulario no válido");
      alert("Formulario no válido");
    }
  }
}
