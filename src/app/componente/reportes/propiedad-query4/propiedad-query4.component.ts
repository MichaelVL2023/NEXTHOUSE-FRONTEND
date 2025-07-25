import {Component, OnInit, ViewChild} from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable, MatTableDataSource
} from '@angular/material/table';
import {MatSort, MatSortHeader} from '@angular/material/sort';
import {MatButton} from '@angular/material/button';
import {MatPaginator} from '@angular/material/paginator';
import {RouterLink} from '@angular/router';
import {DatePipe} from '@angular/common';
import {MatFormField} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {Query4dto} from '../../../model/query4dto';
import {PropiedadService} from '../../../services/propiedad.service';
import {Query2dto} from '../../../model/query2dto';
import {Propiedad} from '../../../model/propiedad';
import {
  BarController,
  BarElement,
  CategoryScale,
  Chart,
  ChartOptions,
  ChartType,
  Legend,
  LinearScale,
  Tooltip
} from 'chart.js';
import {BaseChartDirective} from 'ng2-charts';

@Component({
  selector: 'app-propiedad-query4',
  standalone: true,
  imports: [
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatCell,
    MatCellDef,
    MatSort,
    MatButton,
    MatHeaderRow,
    MatPaginator,
    RouterLink,
    MatSortHeader,
    MatRow,
    MatRowDef,
    DatePipe,
    MatHeaderRowDef,
    MatFormField,
    MatInput,
    BaseChartDirective
  ],
  templateUrl: './propiedad-query4.component.html',
  styleUrl: './propiedad-query4.component.css'
})
export class Query4Component implements OnInit {
  public barChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true, // Asegúrate de que está activado
        position: 'top', // Cambia a 'top', 'bottom', 'left', o 'right' según prefieras
        labels: {
          font: {
            size: 14, // Ajusta el tamaño de la fuente
          },
          color: '#D88', // Cambia el color de las etiquetas si es necesario
        },
      },
      tooltip: {
        enabled: true, // Activa los tooltips para interactividad
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Zonas Geográficas', // Texto del eje X
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Precios', // Texto del eje Y
        },
      },
    },
  };


  public barChartLabels: string[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartData: {
    data: number[];
    label: string;
    backgroundColor: string[];
    borderColor: string;
    borderWidth: number;
  }[] = [];

  constructor(private propiedadService: PropiedadService) {
  }

  ngOnInit(): void {
    Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

    this.propiedadService.listQuery4().subscribe((data: Query4dto[]) => {
      const zonaPreciosMap = data.reduce((acc, item) => {
        const zonaNormalizada = item.zonaGeografica.trim().toLowerCase(); // Normaliza las claves
        if (acc[zonaNormalizada]) {
          acc[zonaNormalizada] += item.precio;
        } else {
          acc[zonaNormalizada] = item.precio;
        }
        return acc;
      }, {} as { [key: string]: number });

      this.barChartLabels = Object.keys(zonaPreciosMap).map((zona) =>
        zona.charAt(0).toUpperCase() + zona.slice(1)
      );
      this.barChartData = [
        {
          data: Object.values(zonaPreciosMap),
          label: 'Precios por Zona',
          backgroundColor: [
            '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40',
          ],
          borderColor: 'rgba(0, 0, 0, 0.1)',
          borderWidth: 1,
        },
      ];
    });
  }
}
