import {Component, OnInit} from '@angular/core';
import {PropiedadService} from '../../../services/propiedad.service';
import {BaseChartDirective} from 'ng2-charts';
import {
  CategoryScale,
  Chart,
  ChartType, Filler, Legend,
  LinearScale,
  LineController,
  LineElement,
  PointElement, RadarController, RadialLinearScale, SubTitle, Title,
  Tooltip
} from 'chart.js';

@Component({
  selector: 'app-propiedad-query7',
  standalone: true,
  imports: [
    BaseChartDirective
  ],
  templateUrl: './propiedad-query7.component.html',
  styleUrl: './propiedad-query7.component.css'
})
export class PropiedadQuery7Component implements OnInit{
  radarChartLabels: string[] = []; // Ciudades
  radarChartData: { data: number[]; label: string }[] = [];  // Datos del gráfico
  radarChartOptions = {
    responsive: true,
    scale: {
      ticks: {
        beginAtZero: true
      }
    }
  };

  radarChartLegend = true;
  radarChartType: ChartType =  'radar'; // Tipo de gráfico

  constructor(private propiedadService: PropiedadService) {}

  ngOnInit(): void {
    Chart.register(RadarController, RadialLinearScale, CategoryScale, LinearScale, PointElement, Tooltip, Legend, Filler, Title, SubTitle, LineElement);
    this.loadChartData();
  }

  loadChartData(): void {
    const ciudades = ['Lima', 'Arequipa', 'Cuzco']; // Lista de ciudades a consultar
    const cantidades: number[] = [];

    ciudades.forEach((ciudad, index) => {
      this.propiedadService.listQuery7(ciudad).subscribe({
        next: (data) => {
          // Tomamos la cantidad de propiedades para cada ciudad
          cantidades[index] = data.reduce((sum, item) => sum + item.cantidadPropiedades, 0);

          if (index === ciudades.length - 1) {
            // Una vez que obtenemos todos los datos, actualizamos el gráfico
            this.radarChartLabels = ciudades;
            this.radarChartData = [
              { data: cantidades, label: 'Cantidad de Propiedades' }
            ];
          }
        },
        error: (err) => console.error(`Error al obtener datos para ${ciudad}:`, err)
      });
    });
  }
}
