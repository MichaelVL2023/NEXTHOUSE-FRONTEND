import { Component } from '@angular/core';
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-confirm-dialogo-unique',
  standalone: true,
  imports: [MatButton,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle],
  templateUrl: './confirm-dialogo.component.html',
  styleUrl: './confirm-dialogo.component.css'
})
export class ConfirmDialogoComponent {

}
