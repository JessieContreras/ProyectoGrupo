import 'zone.js';
import 'zone.js/testing';
import 'zone.js/dist/async-test.js';

import 'zone.js/dist/sync-test';
import 'zone.js/dist/jasmine-patch';


import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';


import { LoginComponent } from './login/login.component';
import { AuthService } from './services/auth.service';
import { ProyectoService } from './services/proyecto.service';


import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from "@angular/platform-browser-dynamic/testing";
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from 'src/environments/environment';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ToastrModule } from 'ngx-toastr';
import { provideStorage } from '@angular/fire/storage';
import { getStorage } from '@firebase/storage';
import { HttpClientModule } from '@angular/common/http';
import { ListReservasComponent } from './list-reservas/list-reservas.component';
TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());


describe('AuthService', () => {
  let service: AuthService;
  let fixture: ComponentFixture<AuthService>;
  let service2: ProyectoService;
  let fixture2: ComponentFixture<ProyectoService>;
  let component: LoginComponent;
  let fixture3: ComponentFixture<LoginComponent>;
  let component2: ListReservasComponent;
  let fixture4: ComponentFixture<ListReservasComponent>;
  function updateForm(userEmail:String, userPassword:String) {
    component.form.controls['userCtrl'].setValue(userEmail);
    component.form.controls['passCtrl'].setValue(userPassword);
  }
  beforeEach(() => {
    
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        AppRoutingModule,
        MatInputModule,
        MatButtonModule,
        MatCardModule,
        MatRadioModule,
        MatCheckboxModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        FormsModule,
        ReactiveFormsModule,
        MatTabsModule,
        MatTableModule,
        MatIconModule,
        MatToolbarModule,
        HttpClientModule,
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideFirestore(() => getFirestore()),
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        AngularFirestoreModule.enablePersistence(),
        BrowserDynamicTestingModule,
        MatSelectModule,
        MatSnackBarModule,
        MatProgressSpinnerModule,
        ToastrModule.forRoot(),
        provideStorage(() => getStorage())
      ],
      providers: [AngularFirestore
      ]
    });
    service = TestBed.inject(AuthService);
    service2 = TestBed.inject(ProyectoService);
    fixture3 = TestBed.createComponent(LoginComponent);
    component = fixture3.componentInstance;
    fixture4 = TestBed.createComponent(ListReservasComponent);
    component2 = fixture4.componentInstance;
    fixture3.detectChanges();
    fixture4.detectChanges();
  });

  it('Creación de componente Login', () => {
    expect(component).toBeTruthy();
  });
  it('Creación de componente listReservas', () => {
    expect(component2).toBeTruthy();
  });
  
   it('Creación de servicio proyecto', () => {
     expect(service).toBeTruthy();
   });
 
   it('Creación de servicio auth', () => {
    expect(service2).toBeTruthy();
  });

  it('Servicio auth - login : credenciales falsas retorna falso', async () => {
    let data = await   service.SignIn('test@espe.edu.ec','falsePassword');
    expect(data).toBeFalsy;
  });

  it('Servicio auth - login : credenciales reales retorna verdadero', async () => {
    let data = await   service.SignIn('test@espe.edu.ec','test@espe.edu.ec');
    expect(data).toBeTruthy();
   
  });



 it('Servicio proyecto - getReservas: Obtener reservas', async () => {
   let reservas = await  service2.getReservas()
   expect(reservas).not.toBeNull();
 });

 it('Servicio proyecto - getReserva: Obtener reserva y5wCg85bjGS21raVTxdA', async () => {
  let reserva = service2.getReserva('y5wCg85bjGS21raVTxdA')
   expect(reserva).not.toBeNull();
 });


it('Componente Login - función login: Login con credenciales falsas debe dar falso',async  () => {
  await  updateForm('test@espe.edu.ec','test123')
  let data = await  component.login();
  expect(data).toBeFalsy;
});

it('Componente Login - función login: con credenciales reales debe dar verdadero',async  () => {
 await updateForm('test@espe.edu.ec','test@espe.edu.ec')
  let data = await  component.login();
  expect(data).toBeTruthy;
});

});
