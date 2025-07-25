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
import {Pago} from "../../model/pago";
import {PropiedadService} from "../../services/propiedad.service";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogoComponent} from "../mensaje-listar/confirm-dialogo/confirm-dialogo.component";
import {PagoService} from "../../services/pago.service";

@Component({
  selector: 'app-pago-listar',
  standalone: true,
  imports: [MatTable,
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
    RouterLink],
  templateUrl: './pago-listar.component.html',
  styleUrl: './pago-listar.component.css'
})
export class PagoListarComponent implements OnInit,AfterViewInit{
  lista: Pago[]=[];
  displayedColumns: string[]=['idPago','fechaTransaccion','monto','reserva','opcionesPago','accion1','accion2'];
  dataSource: MatTableDataSource<Pago>= new MatTableDataSource<Pago>();

  @ViewChild(MatPaginator)paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  pagoService: PagoService= inject(PagoService);
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
    this.pagoService.list().subscribe({
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
    this.pagoService.delete(id).subscribe(() => {
      this.loadLista();
    });
  }
}
