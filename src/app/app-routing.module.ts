import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './Mycomponents/register/register.component';
import { NotFoundComponent } from './Mycomponents/not-found/not-found.component';
import { LoginComponent } from './Mycomponents/login/login.component';
import { ForgotPasswordComponent } from './Mycomponents/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './Mycomponents/verify-email/verify-email.component';
import { AuthGuard } from "./shared/guard/auth.guard";
import { LoginAuthGuard } from "./shared/guard/login-auth.guard";
import { DashboardComponent } from './Mycomponents/dashboard/dashboard.component';
const routes: Routes = [
  { path: 'register', component: RegisterComponent, canActivate: [LoginAuthGuard] },
  { path: '', component: LoginComponent, canActivate: [LoginAuthGuard]},
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'forgot-password', component: ForgotPasswordComponent,  canActivate: [LoginAuthGuard]},
  { path: 'verify-email', component: VerifyEmailComponent,canActivate: [LoginAuthGuard]},
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
