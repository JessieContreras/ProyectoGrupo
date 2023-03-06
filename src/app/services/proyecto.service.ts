import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Injectable({
  providedIn: 'root'
})
export class ProyectoService {

  constructor(private firestore: AngularFirestore,private _http: HttpClient) { }

  agregarReservacion(reserva: any){
    return this.firestore.collection('reservacion').add(reserva);
  }
  getReservas(){
    return this.firestore.collection('reservacion', ref => ref.orderBy('FechaRegistro','desc')).snapshotChanges();
  }
  getReserva(id:any){
    return this.firestore.collection('reservacion').doc(id).get();
  }
  actualizarReservacion(reserva: any,id:any){
    
    return this.firestore.collection('reservacion').doc(id).update(reserva);
  }
  eliminarReservas(id:string):Promise<any>{
    return this.firestore.collection('reservacion').doc(id).delete();
  }
  aceptarResevas(reserva: any,id:string):Promise<any>{

    return this.firestore.collection('reservacion').doc(id).update(reserva);
  }
  enviarCorreo(body: any) {
    return this._http.post('http://localhost:3000/correo', body);
}
}
