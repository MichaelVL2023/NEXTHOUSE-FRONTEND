import {Component, OnInit} from '@angular/core';
import {ArcElement, Chart, ChartOptions, ChartType, DoughnutController, Legend, Tooltip} from 'chart.js';
import {ComentarioService} from '../../../services/comentario.service';
import {Query8dto} from '../../../model/query8dto';
import {OpcionesPagoService} from '../../../services/opciones-pago.service';
import {Query1dto} from '../../../model/query1dto';
import {BaseChartDirective} from 'ng2-charts';

@Component({
  selector: 'app-comentario-query8',
  standalone: true,
  imports: [
    BaseChartDirective
  ],
  templateUrl: './comentario-query8.component.html',
  styleUrl: './comentario-query8.component.css'
})
export class ComentarioQuery8Component implements OnInit{
  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: string[] = [];
  public barChartType: ChartType = 'doughnut';
  public barChartLegend = true;
  public barChartData: { data: number[]; label: string; backgroundColor: string[]; borderColor: string; borderWidth: number; }[] = [];

  constructor(private comentarioService: ComentarioService) { }

  ngOnInit(): void {

    Chart.register(DoughnutController, ArcElement, Tooltip, Legend);

    this.comentarioService.listQuery8().subscribe((data) => {

      this.barChartLabels = data.map((item: Query8dto) => item.nombreUsuario);

      this.barChartData = [

        {
          data: data.map((item: Query8dto) => item.cantidadComentarios),
          label: 'cantidad ',

          backgroundColor: [

            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#4BC0C0',
            '#9966FF',
            '#33FFF3',
            '#3380FF',
            '#FF9F40',
          ],

          borderColor: 'rgba(173, 216, 230, 1)',
          borderWidth: 1,
        },
      ];
    });
  }
}


