import {Component, OnInit} from '@angular/core';
import {PagoService} from '../../../services/pago.service';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Query5dto} from '../../../model/query5dto';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef, MatTable, MatTableDataSource
} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from '@angular/material/datepicker';
import {CurrencyPipe, NgIf} from '@angular/common';
import {MatButton} from '@angular/material/button';
import {MatInput, MatInputModule} from '@angular/material/input';
import {BaseChartDirective} from 'ng2-charts';
import {Pago} from '../../../model/pago';
import {MatCard} from '@angular/material/card';
import {MatListItemAvatar} from '@angular/material/list';
import {MatNativeDateModule} from '@angular/material/core';
import {BarController, BarElement, CategoryScale, Chart, Legend, LinearScale, Tooltip} from 'chart.js';

@Component({
  selector: 'app-pago-query5',
  standalone: true,
  imports: [
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatPaginator,
    MatRow,
    MatRowDef,
    MatTable,
    MatFormField,
    MatDatepicker,
    MatDatepickerToggle,
    MatDatepickerInput,
    ReactiveFormsModule,
    CurrencyPipe,
    MatButton,
    MatInput,
    NgIf,
    BaseChartDirective,
    MatCard,
    MatHeaderCellDef,
    MatLabel,
    MatDatepicker,
    MatNativeDateModule,
    MatInputModule,
    FormsModule,
    MatDatepickerModule,
    MatDatepickerInput

  ],
  templateUrl: './pago-query5.component.html',
  styleUrl: './pago-query5.component.css'
})
export class PagoQuery5Component implements OnInit{
  chart: any;
  startDate!: string; // Fecha de inicio seleccionada por el usuario
  endDate!: string; // Fecha de fin seleccionada por el usuario
  errorMessage = '';

  constructor(private pagoService: PagoService) {}

  ngOnInit(): void {
    Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend);
  }

  // Método para cargar los datos y generar el gráfico
  generateChart(): void {
    if (!this.startDate || !this.endDate) {
      this.errorMessage = 'Por favor, selecciona un rango de fechas válido.';
      return;
    }
    this.errorMessage = '';

    this.pagoService.listQuery5(new Date(this.startDate), new Date(this.endDate)).subscribe({
      next: (data: Query5dto[]) => {
        if (this.chart) {
          this.chart.destroy();
        }
        // Datos del backend
        const totalMonto = data.map((d) => d.montoTotal); // Montos totales
        const labels = data.map((_, index) => `Fecha ${index   + 1}`); // Etiquetas ficticias para el ejemplo

        // Crear el gráfico
        const canvas = document.getElementById('chartCanvas') as HTMLCanvasElement;
        this.chart = new Chart('chartCanvas', {
          type: 'bar',
          data: {
            labels: labels,
            datasets: [
              {
                label: 'Monto Total (S/)',
                data: totalMonto,
                backgroundColor: 'rgba(144, 238, 144, 1)',
                borderColor: 'rgba(144, 238, 144, 1)',
                borderWidth: 1,
              },
            ],
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
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



