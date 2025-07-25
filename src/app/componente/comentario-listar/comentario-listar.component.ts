import {AfterViewInit, Component, inject, OnInit, ViewChild} from '@angular/core';
import {Propiedad} from "../../model/propiedad";
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable,
  MatTableDataSource
} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort, MatSortHeader} from "@angular/material/sort";
import {PropiedadService} from "../../services/propiedad.service";
import {Router, RouterLink} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogoComponent} from "../mensaje-listar/confirm-dialogo/confirm-dialogo.component";
import {DatePipe} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {Comentario} from "../../model/comentario";
import {ComentarioService} from "../../services/comentario.service";

@Component({
  selector: 'app-comentario-listar',
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
  templateUrl: './comentario-listar.component.html',
  styleUrl: './comentario-listar.component.css'
})
export class ComentarioListarComponent implements  OnInit,AfterViewInit{
  lista: Comentario[]=[];
  displayedColumns: string[]=['idComentario','calificacion','tipoUsuario','fechaComentario','comentario','propiedad','usuario','accion1','accion2'];
  dataSource: MatTableDataSource<Comentario>= new MatTableDataSource<Comentario>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  comentarioService: ComentarioService= inject(ComentarioService);
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
    this.comentarioService.list().subscribe({
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
    this.comentarioService.delete(id).subscribe(() => {
      this.loadLista();
    });
  }
}
