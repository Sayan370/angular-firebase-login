import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './Mycomponents/register/register.component';
import { NotFoundComponent } from './Mycomponents/not-found/not-found.component';
import { LoginComponent } from './Mycomponents/login/login.component';
import { ForgotPasswordComponent } from './Mycomponents/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './Mycomponents/verify-email/verify-email.component';
import { DashboardComponent } from './Mycomponents/dashboard/dashboard.component';

import { AuthGuard } from "./shared/guard/auth.guard";

const routes: Routes = [
  { path: 'register', component: RegisterComponent, canActivate: [AuthGuard] },
  { path: '', component: LoginComponent, canActivate: [AuthGuard]},
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'forgot-password', component: ForgotPasswordComponent,  canActivate: [AuthGuard]},
  { path: 'verify-email', component: VerifyEmailComponent,canActivate: [AuthGuard]},
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
