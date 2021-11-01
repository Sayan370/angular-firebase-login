import { Component } from '@angular/core';
import {FormControl, FormGroupDirective,NgForm, Validators, FormGroup} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { AuthService } from "../../shared/service/auth.service";
/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent{
  loading = false;
  constructor(
    public authService: AuthService
  ) { }

  form  = new FormGroup({
    emailFormControl : new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
  
   
  
  }); 
  

  


  forgotPassword(valx:any){

    
 if(this.form.valid){
  this.loading = true;
  this.authService.ForgotPassword(valx).then(()=>{

   this.loading = false;
  });

 return false;

}else{

 return false;

}

    
  }

 

  matcher = new MyErrorStateMatcher();

  get f() {  return this.form.controls; }

}
