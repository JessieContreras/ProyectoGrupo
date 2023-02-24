import { Component, OnInit } from '@angular/core';
import { ProyectoService } from '../services/proyecto.service';
import {
  Storage, ref, uploadBytes,
  listAll, getDownloadURL
} from '@angular/fire/storage';

@Component({
  selector: 'app-list-reservas',
  templateUrl: './list-reservas.component.html',
  styleUrls: ['./list-reservas.component.scss']
})

export class ListReservasComponent implements OnInit{

  images: string[];
  reservaciones: any[] =[];

  constructor(private _proyectoService: ProyectoService, private storage: Storage){
    this.images=[];
   }

  ngOnInit() {
    this.getReservas()
    this.getImages();
  }

  getReservas(){
    this._proyectoService.getReservas().subscribe(data => {
      this.reservaciones = [];
      data.forEach((element: any) => {
        /* console.log(element.payload.doc.data()); */
        this.reservaciones.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
      console.log(this.reservaciones);
    });
  }

  eliminarReservas(id:string){
    this._proyectoService.eliminarReservas(id).then(()=>{
      console.log('Registro Eliminado Exitosamente!');
    }).catch(error=>{
      console.log(error);
    })
  }

  getImages() {
    const imagesRef = ref(this.storage, 'pagos');
    listAll(imagesRef)
    .then(async response =>{
      console.log(response);
      this.images=[];

      for(let item of response.items){
        const url = await getDownloadURL(item);
        this.images.push(url);
      }
    })
    .catch(error => console.log(error));    
  }
}
