import 'zone.js';
import 'zone.js/testing';
import 'zone.js/dist/async-test.js';

import 'zone.js/dist/sync-test';
import 'zone.js/dist/jasmine-patch';


import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthService } from './auth.service';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from "@angular/platform-browser-dynamic/testing";
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from 'src/environments/environment';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
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


describe('AuthService', () => {
  let service: AuthService;
  let fixture: ComponentFixture<AuthService>;


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
  });


   it('Creación de servicio proyecto', () => {
     expect(service).toBeTruthy();
   });
 

  it('Servicio login credenciales falsas retorna falso', async () => {
    let data = await   service.SignIn('test@espe.edu.ec','falsePassword');
    expect(data).toBeFalsy;
  });

  it('Servicio login credenciales reales retorna verdadero', async () => {
    let data = await   service.SignIn('test@espe.edu.ec','test@espe.edu.ec');
    expect(data).toBeTruthy();
   
  });

  
});
