import { Component } from '@angular/core';
import {Query3dto} from '../../../model/query3dto';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {ReservaAlquilerService} from '../../../services/reserva-alquiler.service';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from '@angular/material/datepicker';
import {MatInput, MatInputModule} from '@angular/material/input';
import {NgForOf, NgIf} from '@angular/common';
import {MatNativeDateModule} from '@angular/material/core';

@Component({
  selector: 'app-reserva-query3',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatDatepickerInput,
    MatInput,
    MatDatepickerToggle,
    MatDatepicker,
    NgIf,
    NgForOf,
    MatLabel,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule
  ],
  templateUrl: './reserva-query3.component.html',
  styleUrl: './reserva-query3.component.css'
})
export class ReservaQuery3Component {
  reservations: Query3dto[] = [];
  filterForm: FormGroup;
  isLoading = false;

  constructor(private fb: FormBuilder, private reservaalquilerService: ReservaAlquilerService) {
    this.filterForm = this.fb.group({
      startDate: [''],
      endDate: ['']
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    const { startDate, endDate } = this.filterForm.value;

    if (!startDate || !endDate) {
      alert('Por favor, seleccione ambas fechas.');
      return;
    }

    this.isLoading = true;
    this.reservaalquilerService.listQuery3(new Date(startDate), new Date(endDate)).subscribe({
      next: (data) => {
        this.reservations = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al obtener las reservas:', error);
        this.isLoading = false;
      }
    });
  }
}


