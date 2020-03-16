import { Component, OnInit } from '@angular/core';
import { Marker } from '../../classes/marker.class';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { MapsEditComponent } from '../maps-edit.component';
@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {

  markers: Marker[] = [];
  constructor(public snackBar: MatSnackBar, public dialog: MatDialog) {

    if (localStorage.getItem('markers')) {
      this.markers = JSON.parse(localStorage.getItem('markers'));
    }
    const newMarker = new Marker(51.678418, 7.809007);
    this.markers.push(newMarker);
   }
  lat = 51.678418;
  lng = 7.809007;
  ngOnInit(): void {
  }


  addMarker(event) {

    const coords = event.coords;
    const newMarker = new Marker(coords.lat, coords.lng);
    this.markers.push(newMarker);
    this.saveStorage();
    const snackBarRef = this.snackBar.open('Marker Added', 'Close', {duration: 3000});
  }

  editMarker(marker: Marker) {
    const dialogRef = this.dialog.open(MapsEditComponent, {
      width: '250px',
      data: {titulo: marker.titulo, desd: marker.desc}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }
      marker.titulo = result.titulo;
      marker.desc = result.desc;
      this.saveStorage();
      const snackBarRef = this.snackBar.open('Marker Updated', 'Close', {duration: 3000});

    });
  }

  removeMarker(idx: number) {
    this.markers.splice(idx, 1);
    this.saveStorage();
    const snackBarRef = this.snackBar.open('Marker Removed', 'Close', {duration: 3000});
  }

  saveStorage() {
    localStorage.setItem('markers', JSON.stringify(this.markers) );
  }

}
