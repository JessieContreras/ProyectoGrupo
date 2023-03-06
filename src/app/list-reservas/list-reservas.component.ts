import { Component, OnInit } from '@angular/core';
import { ProyectoService } from '../services/proyecto.service';
import {
  Storage, ref, uploadBytes,
  listAll, getDownloadURL
} from '@angular/fire/storage';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-reservas',
  templateUrl: './list-reservas.component.html',
  styleUrls: ['./list-reservas.component.scss']
})

export class ListReservasComponent implements OnInit {

  images: string[];
  reservaciones: any[] = [];

  constructor( private _proyectoService: ProyectoService,
    private toastr: ToastrService,
    private storage: Storage) {
    this.images = [];


  }

  ngOnInit() {
    this.getReservas()
    this.getImages();
  }

  getReservas() {
    this._proyectoService.getReservas().subscribe(data => {
      this.reservaciones = [];
      data.forEach((element: any) => {
        /* console.log(element.payload.doc.data()); */
        this.reservaciones.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
      this.reservaciones.forEach(async (element) => {

          if(element.pago!=undefined){
            const imagesRef = ref(this.storage, 'pagos/' + element.pago);
            console.log(imagesRef.fullPath);
    
            element.url =  await getDownloadURL(imagesRef); 
          }

      });
      console.log(this.reservaciones);
    });
  }

  eliminarReservas(id: string,img:string) {
    this._proyectoService.eliminarReservas(id).then(() => {
      this.toastr.success('Reserva eliminada correctamente', '¡Proceso exitoso!');
      let reserva:any = {}
      this._proyectoService.getReserva(id).subscribe(data => {
        reserva = data.data()
        let body = {
          img ,
          nombre: reserva.Nombre,
          Cedula: reserva.Cedula,
          Telefono: reserva.Telefono,
          Correo: reserva.Correo,
          TipoHabitacion: reserva.TipoHabitacion,
          extra: 'Su solicitud fue rechazada'
        }
        this._proyectoService.enviarCorreo(body).subscribe(res=>{
  
        })
    })
     
    }).catch(error => {
      console.log(error);
    })
  }
  aceptarReservas(id: string,img:string){
    let reserva:any = {}
    this._proyectoService.getReserva(id).subscribe(data => {
       reserva = data.data()
       reserva.aceptado = true;
      this._proyectoService.aceptarResevas(reserva , id).then(() => {
        this.toastr.success('Reserva aceptada correctamente', '¡Proceso exitoso!');
        let body = {
          img ,
          nombre: reserva.Nombre,
          Cedula: reserva.Cedula,
          Telefono: reserva.Telefono,
          Correo: reserva.Correo,
          TipoHabitacion: reserva.TipoHabitacion,
          extra: 'Su solicitud fue aceptada con éxito'
        }
        this._proyectoService.enviarCorreo(body).subscribe(res=>{

        })
      }).catch(error => {
        console.log(error);
      })

    })
   
  }
  async getImages() {

    /*   const imagesRef = ref(this.storage, 'pagos');
      listAll(imagesRef)
      .then(async response =>{
        console.log(response.items);
        this.images=[];
  
        for(let item of response.items){
          console.log(item);
          
          const url = await getDownloadURL(item);
          this.images.push(url);
        }
      })
      .catch(error => console.log(error));     */
  }
  async getimg(url: any) {
    if (url != undefined) {
      console.log(url);

    }
    /*     const imagesRef = ref(this.storage,'pagos/'+url);
        console.log(imagesRef.fullPath);
        
        return await getDownloadURL(imagesRef); */
  }
}
