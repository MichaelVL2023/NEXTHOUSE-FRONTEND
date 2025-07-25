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
import {MatSort, MatSortHeader} from "@angular/material/sort";
import {MatButton} from "@angular/material/button";
import {MatPaginator} from "@angular/material/paginator";
import {Router, RouterLink} from "@angular/router";
import {DatePipe} from "@angular/common";
import {MatDialog} from "@angular/material/dialog";
import {Ubicacion} from "../../model/ubicacion";
import {UbicacionService} from "../../services/ubicacion.service";
import {ConfirmDialogoComponent} from "../opciones-pago-listar/confirm-dialogo/confirm-dialogo.component";

@Component({
  selector: 'app-ubicacion-listar',
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
    MatHeaderRowDef
  ],
  templateUrl: './ubicacion-listar.component.html',
  styleUrl: './ubicacion-listar.component.css'
})
export class UbicacionListarComponent implements  OnInit,AfterViewInit{
  lista: Ubicacion[]=[];
  displayedColumns: string[]=['idUbicacion','ciudad','direccion','accion1','accion2'];
  dataSource: MatTableDataSource<Ubicacion> = new MatTableDataSource<Ubicacion>();

  @ViewChild(MatPaginator)paginator: MatPaginator;
  @ViewChild(MatSort)sort:MatSort;

  ubicacionService: UbicacionService = inject(UbicacionService);
  route: Router =inject(Router);
  dialog = inject(MatDialog)

  constructor() {
    console.log("Load constructor!")
  }

  ngAfterViewInit():void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void{
    console.log("Load Lista!");
    this.loadLista();
  }


  private loadLista():void {
    this.ubicacionService.list().subscribe({
      next: (data) => this.dataSource.data = data,
      error: (error) => console.log("Error e en consulta",error),
    })
  }
  openDialog(id:number){
    const dialogRef = this.dialog.open(ConfirmDialogoComponent);
    dialogRef.afterClosed().subscribe(result =>{
      if(result){
        this.delete(id);
      }else{
        console.log("Diálogo respondió no eliminar");
      }
    });
  }

  delete(id:number){
    this.ubicacionService.delete(id).subscribe(()=>{
      this.loadLista()
    });
  }
}
