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
import {ActivatedRoute, Params, Router} from "@angular/router";
import {PagoService} from "../../services/pago.service";
import {ReservaAlquilerService} from "../../services/reserva-alquiler.service";
import {OpcionesPagoService} from "../../services/opciones-pago.service";
import {ReservaAlquiler} from "../../model/reserva-alquiler";
import {OpcionesPago} from "../../model/opciones-pago";
import {Pago} from "../../model/pago";

@Component({
  selector: 'app-pago',
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
    MatNativeDateModule],
  templateUrl: './pago.component.html',
  styleUrl: './pago.component.css'
})
export class PagoComponent implements OnInit{
  pagoForm: FormGroup;
  fb: FormBuilder=inject(FormBuilder);
  pagoService: PagoService = inject(PagoService);

  reservaService:ReservaAlquilerService=inject(ReservaAlquilerService);
  opcionesPagoService:OpcionesPagoService=inject(OpcionesPagoService);

  router: Router = inject(Router);



  edicion: boolean = false;
  route:ActivatedRoute = inject(ActivatedRoute)
  id: number = 0


  public idReservaAlquilerSeleccionado: number = 0;
  listaReservaAlquiler: ReservaAlquiler[] = [];
  reserva: ReservaAlquiler = new ReservaAlquiler();

  public idOpcionesPagoSeleccionado: number = 0;
  listOpcionesPago: OpcionesPago[] = [];
  opcionesPago: OpcionesPago = new OpcionesPago();

  constructor() {
    console.log("Contructor PagoNuevoEditComponent")
    this.pagoForm = this.fb.group({
      idPago: [''],
      fechaTransaccion: ['', Validators.required],
      monto: ['', Validators.required],
      reserva: ['', Validators.required],
      opcionesPago: ['', Validators.required],
    })
  }
  ngOnInit(): void {
    this.route.params.subscribe((data:Params): void => {
      console.log("ngOnInit de PagoNuevoEditComponent")
      console.log(data);
      this.id = data['id']; //capturando el id del listado
      this.edicion = data['id']!= null;//true, false
      this.cargaForm();
    });
    this.loadListaReservaAlquiler();
    this.loadListaOpcionPago();
  }
  private cargaForm(): void {
    if(this.edicion){
      this.pagoService.listId(this.id).subscribe({
        next: (data: Pago):void => {
          console.log(data);
          this.pagoForm.patchValue({
            idPago: data.idPago,
            fechaTransaccion: data.fechaTransaccion,
            monto: data.monto,


            reserva: data.reserva,
            opcionesPago: data.opcionesPago,
          });
        },
        error: (err) => console.error("Error al cargar reserva de alquiler", err) // Muestra el error en la consola
      })
    }
  }


  loadListaReservaAlquiler(): void {
    this.reservaService.list().subscribe({
      next: (data) => this.listaReservaAlquiler = data,
      error: (err) => console.error("Error en consulta de Reserva", err)
    });
  }

  loadListaOpcionPago(): void {
    this.opcionesPagoService.list().subscribe({
      next: (data) => this.listOpcionesPago = data,
      error: (err) => console.error("Error en consulta de Opcion de Pago", err)
    });


  }
  onSubmit() {
    if (this.pagoForm.valid) {
      const pago: Pago = new Pago();
      pago.idPago = this.edicion ? this.id : 0;
      pago.fechaTransaccion = this.pagoForm.value.fechaTransaccion;
      pago.monto = this.pagoForm.value.monto;

      pago.reserva = this.reserva;
      pago.reserva.idReserva = this.pagoForm.value.reserva;

      pago.opcionesPago = this.opcionesPago;
     pago.opcionesPago.idOppago = this.pagoForm.value.opcionesPago;


      if (!this.edicion) {
        this.pagoService.insert(pago).subscribe(() => this.actualizaLista());
      } else {
        this.pagoService.update(pago).subscribe(() => this.actualizaLista());
      }
      this.router.navigate(['pago/nuevo']);
      alert("Registro ok")
    } else {
      console.log("Formulario no válido");
    }
  }
  private actualizaLista(): void {
    this.pagoService.list().subscribe(data => {
      this.pagoService.setList(data);
    });
  }
}
