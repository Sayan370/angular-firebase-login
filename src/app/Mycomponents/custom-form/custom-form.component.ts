import { Component,NgZone } from '@angular/core';
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
  selector: 'app-custom-form',
  templateUrl: './custom-form.component.html',
  styleUrls: ['./custom-form.component.css']
})
export class CustomFormComponent {
  hide = true;
  loading = false;
  loading1 = false;
  
  constructor(
    public authService: AuthService,
    private zone:NgZone


   
  ) { }

  form  = new FormGroup({
    emailFormControl : new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
  
    passwordFormControl : new FormControl('', [
      Validators.required,
      Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^\w\d])[A-Za-z\d^\w\d|,.].{8,}')
    ]),
  
  }); 
  
 
  matcher = new MyErrorStateMatcher();

  save(username:any,userpassword:any): boolean {

 

 if(this.form.valid){
   this.loading = true;
   this.authService.SignIn(username, userpassword).then(()=>{

    this.loading = false;
   });

  return false;

 }else{

  return false;

 }


  
  }
  gLogin(): void{
    this.loading1 = true;
    this.authService.GoogleAuth().then(()=>{
      this.zone.run(() => { // <== added
      this.loading1 = false;
      });
     }).catch(()=>{
      this.loading1 = false;
     });
   }
  
   get f() {  return this.form.controls; }

}
