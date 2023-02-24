import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProyectoService } from '../services/proyecto.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class FormularioComponent implements OnInit {

  form: FormGroup;
  protected aFormGroup: FormGroup;
  submitted = false;
  /* habitacionCtrl=[
    'Habitacion individual',
    'habitacion'
  ] */
  constructor(private formBuilder: FormBuilder,
     private _reservaHabitacion:ProyectoService,
     private router: Router) {
    this.buildForm();
   }
   ngOnInit() {  }
   
  private buildForm(){
    this.form = this.formBuilder.group({
      nameCtrl: new FormControl('',[Validators.required, Validators.pattern('[A-Z a-z]*')]),
      numberCtrl: new FormControl('',[Validators.required, Validators.maxLength(10), Validators.minLength(10), Validators.pattern('[0-9]*')]),
      emailCtrl: new FormControl('', [Validators.required, Validators.email]),
      phoneCtrl: new FormControl('',[Validators.required, Validators.maxLength(10), Validators.minLength(10), Validators.pattern('[0-9]*')]),
      habitacionCtrl: new FormControl('', [Validators.required])
    })
  }

  get nameField(){
    return this.form.get('nameCtrl');
  }
  get numberField(){
    return this.form.get('numberCtrl');
  }
  get emailField(){
    return this.form.get('emailCtrl');
  }
  get phoneField(){
    return this.form.get('phoneCtrl');
  }
  get habitacionField(){
    return this.form.get('habitacionCtrl');
  }
    
 /*  habitacion: any[] =[
    {tipohabitacion:'uno', muestrahabitacion:'Habitación Individual'},
    {tipohabitacion:'dos', muestrahabitacion:'Habitación Doble'},
    {tipohabitacion:'tres', muestrahabitacion:'Habitación Triple'},
    {tipohabitacion:'cuatro', muestrahabitacion:'Habitación Quad'}
  ];
 */
  /* Enviar(){
    window.location.href = 'subir';
  }

  save(event: Event){
    event.preventDefault();
    if(this.form.valid){
      
      const value=this.form.value;
      console.log(value);
    }else{
      this.form.markAllAsTouched();
    }
  } */
  

  agregarReserva(){
    if (this.form.invalid) {
      return;
    }
    this.submitted=true;
    const reserva: any={
      Nombre: this.form.value.nameCtrl,
      Cedula: this.form.value.numberCtrl,
      Correo: this.form.value.emailCtrl,
      Telefono: this.form.value.phoneCtrl,
      TipoHabitacion: this.form.value.habitacionCtrl,
      FechaRegistro: new Date()
    }
    this._reservaHabitacion.agregarReservacion(reserva).then(()=>{
      console.log('Habitacion registrada con Exito!');
      this.router.navigate(['/subir'])
    }).catch(error =>{
      console.log(error);
    })
  }

}
