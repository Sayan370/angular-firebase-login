import { NgModule } from '@angular/core';
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';

import { ReactiveFormsModule } from '@angular/forms';

import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
import { CustomFormComponent } from './Mycomponents/custom-form/custom-form.component';
import {MatInputModule} from '@angular/material/input';
import { RegisterComponent } from './Mycomponents/register/register.component';
import { NotFoundComponent } from './Mycomponents/not-found/not-found.component';
import { LoginComponent } from './Mycomponents/login/login.component';
import { SignupFormComponent } from './Mycomponents/signup-form/signup-form.component';

import { environment } from '../environments/environment';
import { AuthService } from "./shared/service/auth.service";
import { ForgotPasswordComponent } from './Mycomponents/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './Mycomponents/verify-email/verify-email.component';
import { DashboardComponent } from './Mycomponents/dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomFormComponent,
    RegisterComponent,
    NotFoundComponent,
    LoginComponent,
    SignupFormComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    DashboardComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatGridListModule,
    ReactiveFormsModule,
    SocialLoginModule,
    MatInputModule 
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '60103749195-7hf4uioi9mdc3ltpekbuk91c5a6mvkfo.apps.googleusercontent.com'
            )
          }
        ]
      } as SocialAuthServiceConfig,
    },
    AuthService   
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
