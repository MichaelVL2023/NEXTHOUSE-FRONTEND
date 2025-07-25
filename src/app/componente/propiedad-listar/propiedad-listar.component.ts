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
import {ConfirmDialogoComponent} from "../mensaje-listar/confirm-dialogo/confirm-dialogo.component";
import {Propiedad} from "../../model/propiedad";
import {PropiedadService} from "../../services/propiedad.service";

@Component({
  selector: 'app-propiedad-listar',
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
    RouterLink
  ],
  templateUrl: './propiedad-listar.component.html',
  styleUrl: './propiedad-listar.component.css'
})
export class PropiedadListarComponent implements  OnInit,AfterViewInit{
  lista: Propiedad[]=[];
  displayedColumns: string[]=['idPropiedad','titulo','descripcion','precio','tipo','estado','fechaPublicacion','descripcionUsuario','ubicacion','usuario','accion1','accion2'];
  dataSource: MatTableDataSource<Propiedad>= new MatTableDataSource<Propiedad>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  propiedadService: PropiedadService= inject(PropiedadService);
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
    this.propiedadService.list().subscribe({
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
    this.propiedadService.delete(id).subscribe(() => {
      this.loadLista();
    });
  }

}
