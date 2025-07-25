import {Component, OnInit} from '@angular/core';
import {PropiedadService} from '../../../services/propiedad.service';
import {
  BarController,
  BarElement,
  CategoryScale,
  Chart,
  Legend,
  LinearScale,
  LineController,
  LineElement, PointElement,
  Tooltip
} from 'chart.js';
import {Query6dto} from '../../../model/query6dto';
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from '@angular/material/datepicker';
import {MatError, MatFormField, MatLabel, MatSuffix} from '@angular/material/form-field';
import {MatInput, MatInputModule} from '@angular/material/input';
import {NgIf} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatNativeDateModule} from '@angular/material/core';

@Component({
  selector: 'app-propiedad-query6',
  standalone: true,
  imports: [
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatFormField,
    MatInput,
    MatLabel,
    MatSuffix,
    NgIf,
    ReactiveFormsModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule
  ],
  templateUrl: './propiedad-query6.component.html',
  styleUrl: './propiedad-query6.component.css'
})
export class PropiedadQuery6Component implements OnInit{
  chart: any;
  startDate!: string; // Fecha de inicio seleccionada por el usuario
  endDate!: string; // Fecha de fin seleccionada por el usuario
  errorMessage = '';

  constructor(private propiedadService: PropiedadService) {}

  ngOnInit(): void {
    Chart.register(LineController, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);
  }

  // Método para cargar los datos y generar el gráfico
  generateChart(): void {
    if (!this.startDate || !this.endDate) {
      this.errorMessage = 'Por favor, selecciona un rango de fechas válido.';
      return;
    }
    this.errorMessage = '';

    this.propiedadService.listQuery6(new Date(this.startDate), new Date(this.endDate)).subscribe({
      next: (data: Query6dto[]) => {
        if (this.chart) {
          this.chart.destroy();
        }
        // Datos del backend
        const Propidades = data.map((d) => d.propiedadesPublicadas); // Montos totales
        const labels = data.map((_, index) => `Rango ${index   + 1}`); // Etiquetas ficticias para el ejemplo

        // Crear el gráfico
        const canvas = document.getElementById('chartCanvas') as HTMLCanvasElement;
        this.chart = new Chart('chartCanvas', {
          type: 'line',
          data: {
            labels: labels,
            datasets: [
              {
                label: 'Cantitad de Propiedades Publicadas',
                data: Propidades,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
              },
            ],
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                display: true,
                position: 'top',
              },
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: 'Rangos de Fechas'
                }
              },
              y: {
                title: {
                  display: true,
                  text: 'Cantidad de Propiedades'
                },
                beginAtZero: true
              }
            },
          },
        });
      },
      error: (err) => {
        this.errorMessage = 'Hubo un error al obtener los datos.';
        console.error(err);
      },
    });
  }
}
