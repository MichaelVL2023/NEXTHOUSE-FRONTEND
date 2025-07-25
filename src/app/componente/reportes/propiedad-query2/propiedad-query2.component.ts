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
import {DatePipe, NgForOf} from '@angular/common';
import {MatFormField} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {PropiedadService} from '../../../services/propiedad.service';
import {Query2dto} from '../../../model/query2dto';
import {Query1dto} from '../../../model/query1dto';
import {Propiedad} from '../../../model/propiedad';
import {Query4dto} from '../../../model/query4dto';

@Component({
  selector: 'app-propiedad-query2',
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
    NgForOf
  ],
  templateUrl: './propiedad-query2.component.html',
  styleUrl: './propiedad-query2.component.css'
})
export class Query2Component implements OnInit {
  propiedad: Propiedad[] | Query2dto = [];
  displayedColumns: string[] = ['nombreUsuario', 'nombreCasa'];
  dataSource:  MatTableDataSource<Query2dto>= new MatTableDataSource<Query2dto>();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private propiedadService: PropiedadService) {}

  ngOnInit(): void {
    this.loadQuery2Results();
  }

  loadQuery2Results(): void {
    this.propiedadService.listQuery2().subscribe((data: Query2dto[]) => {
      console.log("Data: ", data);
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }


}
