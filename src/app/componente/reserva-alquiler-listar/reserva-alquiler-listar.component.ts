import {AfterViewInit, Component, inject, OnInit, ViewChild} from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable, MatTableDataSource
} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {DatePipe} from "@angular/common";
import {MatSort, MatSortHeader} from "@angular/material/sort";
import {MatButton} from "@angular/material/button";
import {Router, RouterLink} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogoComponent} from "../mensaje-listar/confirm-dialogo/confirm-dialogo.component";
import {ReservaAlquiler} from "../../model/reserva-alquiler";
import {ReservaAlquilerService} from "../../services/reserva-alquiler.service";
import {MatNativeDateModule} from "@angular/material/core";
import { MatMomentDateModule } from '@angular/material-moment-adapter';

@Component({
  selector: 'app-reserva-alquiler-listar',
  standalone: true,
  imports: [ MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderCellDef,
    MatCellDef,
    MatHeaderRow,
    MatRow,
    MatHeaderRowDef,
    MatRowDef,
    MatPaginator,
    DatePipe,
    MatSort,
    MatSortHeader,
    MatButton,
    RouterLink
  ],
  templateUrl: './reserva-alquiler-listar.component.html',
  styleUrl: './reserva-alquiler-listar.component.css'
})
export class ReservaAlquilerListarComponent implements OnInit,AfterViewInit{
  lista: ReservaAlquiler[]=[];
  displayedColumns: string[] = ['idReserva', 'fechaInicio', 'fechaFin', 'precioMensual', 'estado', 'usuario', 'accion1', 'accion2'];
  dataSource: MatTableDataSource<ReservaAlquiler>= new MatTableDataSource<ReservaAlquiler>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  reservaAlquilerService: ReservaAlquilerService= inject(ReservaAlquilerService);
  router:Router = inject(Router);
  dialog:MatDialog = inject(MatDialog)

  constructor() {
    console.log("Load constructor!")
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator= this.paginator;
  }
  ngOnInit() {
    console.log("Load Lista");
    this.loadLista();
  }
  private loadLista() {
    this.reservaAlquilerService.list().subscribe({
      next: (data) => this.dataSource.data = data,
      error: (err) => console.error("Error en consulta", err)
    })
  }
  openDialog(id:number): void {
    const dialogRef = this.dialog.open(ConfirmDialogoComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.delete(id);
      }else{
        console.log("Diálogo respondió no eliminar");
      }
    });
  }
  delete(id:number): void {
    this.reservaAlquilerService.delete(id).subscribe(() => {
      this.loadLista();
    });
  }
}
