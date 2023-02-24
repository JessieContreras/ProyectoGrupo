import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

const    ELEMENT_DATA: any[] = [
  {position: 1, name: 'Maylon', cedula: '1234567891', tipo_habitacion: 'Habitación Individual'},
  {position: 2, name: 'Jennifer', cedula: '1234567892', tipo_habitacion: 'Habitación doble'},

];
const    ELEMENT_DATA2: any[] = [
  {position: 1, url: 'https://upload.wikimedia.org/wikipedia/commons/3/3a/Logo_ESPEOk.png'},

];

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})

export class AdminComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'cedula', 'tipo_habitacion','acciones'];
  displayedColumns2: string[] = ['position', 'url','acciones'];
  dataSource = ELEMENT_DATA;
  dataSource2 = ELEMENT_DATA2;

  items: Observable<any[]>;

  constructor(firestore: AngularFirestore) { 

  }

  ngOnInit(): void {
  }

}
