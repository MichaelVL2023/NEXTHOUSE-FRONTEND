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
import {Mensaje} from "../../model/mensaje";
import {MensajeService} from "../../services/mensaje.service";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogoComponent} from "./confirm-dialogo/confirm-dialogo.component";

@Component({
  selector: 'app-mensaje-listar',
  standalone: true,
  imports: [
    MatTable,
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
  templateUrl: './mensaje-listar.component.html',
  styleUrl: './mensaje-listar.component.css'
})
export class MensajeListarComponent implements OnInit,AfterViewInit{
  lista: Mensaje[]=[];
  displayedColumns: string[]=['idMensaje','contenido','fechaEnvio','tipo','usuario','accion1','accion2'];
  dataSource: MatTableDataSource<Mensaje>= new MatTableDataSource<Mensaje>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  mensajeService: MensajeService= inject(MensajeService);
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
    this.mensajeService.list().subscribe({
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
    this.mensajeService.delete(id).subscribe(() => {
      this.loadLista();
    });
  }
}
