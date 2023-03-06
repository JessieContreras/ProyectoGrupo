import 'zone.js';
import 'zone.js/testing';
import 'zone.js/dist/async-test.js';

import 'zone.js/dist/sync-test';
import 'zone.js/dist/jasmine-patch';


import { ComponentFixture, TestBed,  fakeAsync } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './login.component';
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

TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  function updateForm(userEmail:String, userPassword:String) {
    component.form.controls['userCtrl'].setValue(userEmail);
    component.form.controls['passCtrl'].setValue(userPassword);
  }
  beforeEach( async() => {
     await TestBed.configureTestingModule({
      declarations: [
        LoginComponent,
      ],
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
    }).compileComponents();
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  
  it('Creación de componente', () => {
    expect(component).toBeTruthy();
  });


  it('Login con usuario falso debe dar falso',async  () => {
    await  updateForm('test@espe.edu.ec','test123')
    let data = await  component.login();
    expect(data).toBeFalsy;
  });

  it('Login con usuario falso debe dar verdadero',async  () => {
   await updateForm('test@espe.edu.ec','test@espe.edu.ec')
    let data = await  component.login();
    expect(data).toBeTruthy;
  });


});
