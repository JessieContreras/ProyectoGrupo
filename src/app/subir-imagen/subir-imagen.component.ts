import { Component, OnInit } from '@angular/core';
import {
  Storage, ref, uploadBytes,
  listAll, getDownloadURL
} from '@angular/fire/storage';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProyectoService } from '../services/proyecto.service';


@Component({
  selector: 'app-subir-imagen',
  templateUrl: './subir-imagen.component.html',
  styleUrls: ['./subir-imagen.component.scss']
})
export class SubirImagenComponent implements OnInit {

  images: string[];
  imageSrc: any = '';
  estado = 0;
  id = '';
  file: any;
  reserva: any;
  constructor(private storage: Storage, private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private _reservaHabitacion: ProyectoService,
  ) {
    this.images = [];
    this.route.params.subscribe(params => {
      console.log(params['id']) //log the value of id
      this._reservaHabitacion.getReserva(params['id']).subscribe(data => {
        this.reserva = data.data()
        this.id = params['id']
        console.log(this.reserva);

      })
    });
  }

  ngOnInit() {
    this.getImages();
  }
  SubirImagen() {
    let nameImg = (new Date()).getTime();

    const imgRef = ref(this.storage, `pagos/${nameImg}.${this.file.name.split('.').pop()}`);

    uploadBytes(imgRef, this.file)
      .then(response => {

        this.toastr.success('Imagen subida correctamente', '¡Proceso exitoso!');
        this.reserva.pago = nameImg+'.'+this.file.name.split('.').pop();
        this._reservaHabitacion.actualizarReservacion(this.reserva,this.id).then(data => {


        })
        this.router.navigate(['/'])
      })
      .catch(error => console.log(error));
  }
  uploadImage($event: any) {
    this.file = $event.target.files[0];
    console.log(this.file);

    const reader = new FileReader();
    reader.onload = e => this.imageSrc = reader.result;

    reader.readAsDataURL(this.file);


    /*  */
  }

  getImages() {
    const imagesRef = ref(this.storage, 'pagos');
    listAll(imagesRef)
      .then(async response => {
        console.log(response);
        this.images = [];

        for (let item of response.items) {
          const url = await getDownloadURL(item);
          this.images.push(url);
        }
      })
      .catch(error => console.log(error));
  }

}
