import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable,
  MatTableDataSource
} from '@angular/material/table';
import {MatSort, MatSortHeader} from '@angular/material/sort';
import {MatButton} from '@angular/material/button';
import {RouterLink} from '@angular/router';
import {DatePipe} from '@angular/common';
import { OpcionesPagoService } from '../../../services/opciones-pago.service';
import { Query1dto } from '../../../model/query1dto';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import {Chart,ChartOptions, ChartType} from 'chart.js';
import { DoughnutController, ArcElement, Tooltip, Legend } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-opciones-pago-query1',
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
    BaseChartDirective,

  ],
  templateUrl: './opciones-pago-query1.component.html',
  styleUrl: './opciones-pago-query1.component.css'
})

export class OpcionesPagoQuery1Component implements OnInit {
  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: string[] = [];
  public barChartType: ChartType = 'doughnut';
  public barChartLegend = true;
  public barChartData: { data: number[]; label: string; backgroundColor: string[]; borderColor: string; borderWidth: number; }[] = [];

  constructor(private opcionesPago: OpcionesPagoService) { }



  ngOnInit(): void {

    Chart.register(DoughnutController, ArcElement, Tooltip, Legend);

    this.opcionesPago.listQuery1().subscribe((data) => {

      this.barChartLabels = data.map((item: Query1dto) => item.nombreMetodo);

      this.barChartData = [

        {
          data: data.map((item: Query1dto) => item.contar),
          label: 'cantidad ',

          backgroundColor: [

            '#8D33FF',
            '#33FF57',
            '#3380FF',
            '#DAF7A6',
            '#33FF57',
            '#33FFF3',
            '#3380FF',
            '#8D33FF',
          ],

          borderColor: 'rgba(173, 216, 230, 1)',
          borderWidth: 1,
        },
      ];
    });
  }
}

