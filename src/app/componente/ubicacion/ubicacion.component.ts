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
import {UbicacionService} from "../../services/ubicacion.service";
import {Ubicacion} from "../../model/ubicacion";

@Component({
  selector: 'app-ubicacion',
  standalone: true,
  imports: [MatCard,
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
    MatInputModule],
  templateUrl: './ubicacion.component.html',
  styleUrl: './ubicacion.component.css'
})
export class UbicacionComponent implements OnInit{

  ubicacionForm: FormGroup ;
  fb: FormBuilder = inject(FormBuilder);
  ubicacionService: UbicacionService = inject(UbicacionService);
  router: Router=inject(Router);
  id: number =0;
  edicion:boolean = false;
  route:ActivatedRoute = inject(ActivatedRoute);


  constructor() {
    console.log("Carga constructor de Form")
    this.ubicacionForm = this.fb.group({
      idUbicacion: [''],
      ciudad: ['', Validators.required],
      direccion: ['', Validators.required],
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
      this.ubicacionService.listID(this.id).subscribe((data:Ubicacion):void => {
        console.log(data);
        this.ubicacionForm.patchValue({
          ciudad:data.ciudad,
          direccion:data.direccion,
        });
      });
    }
  }
  onSubmit(): void {
    if (this.ubicacionForm.valid) {
      const ubicacion: Ubicacion = new Ubicacion();
      ubicacion.idUbicacion= this.id;
      ubicacion.ciudad= this.ubicacionForm.value.ciudad;
      ubicacion.direccion= this.ubicacionForm.value.direccion;

      if (!this.edicion) {
        this.ubicacionService.insert(ubicacion).subscribe((data: Object): void => {
          this.ubicacionService.list().subscribe(data => {
            this.ubicacionService.setList(data);
          });
        });
      } else {
        this.ubicacionService.update(ubicacion).subscribe((data: Object): void => {
          this.ubicacionService.list().subscribe(data => {
            this.ubicacionService.setList(data);
          });
        });
      }
      this.router.navigate(['ubicacion/nuevo']);
      alert("Registo ok");
    } else {
      console.log("Formulario no válido");
      alert("Formulario no válido");
    }
  }
}
