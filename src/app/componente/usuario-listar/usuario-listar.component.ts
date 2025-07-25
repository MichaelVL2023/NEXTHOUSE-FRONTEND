import {AfterViewInit, Component, inject, OnInit, ViewChild} from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable, MatTableDataSource, MatTableModule
} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {DatePipe} from "@angular/common";
import {MatSort, MatSortHeader} from "@angular/material/sort";
import {MatButton} from "@angular/material/button";
import {Router, RouterLink} from "@angular/router";
import {Usuario} from "../../model/usuario";
import {UsuarioService} from "../../services/usuario.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ConfirmDialogoComponent} from "./confirm-dialogo/confirm-dialogo.component";

@Component({
  selector: 'app-usuario-listar',
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
  templateUrl: './usuario-listar.component.html',
  styleUrl: './usuario-listar.component.css'
})
export class UsuarioListarComponent implements OnInit,AfterViewInit{
  lista: Usuario[]=[];
  displayedColumns=['idUsuario','nombreCompleto','email','telefono','contrasena','rol','accion1','accion2'];
  dataSource:MatTableDataSource<Usuario>= new MatTableDataSource<Usuario>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort)sort:MatSort;

  usuarioService:UsuarioService= inject(UsuarioService);
  router:Router= inject(Router);
  dialog = inject(MatDialog)

  constructor() {
    console.log("Load constructor!")
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit() {
    console.log("Load Lista!");
    this.loadLista();
  }
  private loadLista(): void {
    this.usuarioService.list().subscribe({
      next: (data) => this.dataSource.data = data,
      error: (err) => console.error("Error en consulta", err)
    })
  }
  openDialog(id:number){
    const dialogRef = this.dialog.open(ConfirmDialogoComponent);
    dialogRef.afterClosed().subscribe(result =>{
      if(result){
        this.delete(id);
      } else{
        console.log("Diálogo respondió no eliminar");
      }
    });
  }
  delete(id:number): void {
    this.usuarioService.delete(id).subscribe(() => {
      this.loadLista();
    });
  }
}
