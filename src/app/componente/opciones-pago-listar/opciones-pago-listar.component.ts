import {Component, inject, ViewChild, viewChild} from '@angular/core';
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
import {OpcionesPago} from "../../model/opciones-pago";
import {OpcionesPagoService} from "../../services/opciones-pago.service";
import {ConfirmDialogoComponent} from "./confirm-dialogo/confirm-dialogo.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-opciones-pago-listar',
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
  templateUrl: './opciones-pago-listar.component.html',
  styleUrl: './opciones-pago-listar.component.css'
})
export class OpcionesPagoListarComponent {
  lista: OpcionesPago[]=[];
  displayedColumns: string[]=['idOppago','metodoPago','descripcion','accion1','accion2'];
  dataSource: MatTableDataSource<OpcionesPago> = new MatTableDataSource<OpcionesPago>();

  @ViewChild(MatPaginator)paginator: MatPaginator;
  @ViewChild(MatSort)sort:MatSort;

  opcionesPagoService: OpcionesPagoService = inject(OpcionesPagoService);
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
    this.opcionesPagoService.list().subscribe({
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
    this.opcionesPagoService.delete(id).subscribe(()=>{
      this.loadLista()
    });
  }

}
