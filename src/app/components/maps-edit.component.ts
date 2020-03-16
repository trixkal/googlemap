import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-maps-edit',
  templateUrl: './maps-edit.component.html',
  styleUrls: ['./maps-edit.component.css']
})
export class MapsEditComponent implements OnInit {


  forma: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<MapsEditComponent>,
    public formb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any) {


      this.forma = formb.group({
        titulo: data.titulo,
        desc: data.desc

      });

    }

  ngOnInit(): void {
  }

  saveMarker() {
    this.dialogRef.close(this.forma.value);

  }

  onNoClick() {
    this.dialogRef.close();
  }
}
