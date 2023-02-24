import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Injectable({
  providedIn: 'root'
})
export class ProyectoService {

  constructor(private firestore: AngularFirestore) { }

  agregarReservacion(reserva: any){
    return this.firestore.collection('reservacion').add(reserva);
  }
  getReservas(){
    return this.firestore.collection('reservacion', ref => ref.orderBy('FechaRegistro','desc')).snapshotChanges();
  }
  eliminarReservas(id:string):Promise<any>{
    return this.firestore.collection('reservacion').doc(id).delete();
  }
}
