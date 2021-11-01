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
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})


export class SignupFormComponent{
  loading = false;
  loading1 = false;
  constructor(
    public authService: AuthService
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

  signup(useremail:any,passwords:any): any{

    

 if(this.form.valid){
    this.loading=true;

    this.authService.SignUp(useremail, passwords).then(()=>{

      this.loading=false;
    })

    return false;
  }else{

    return false;
  }
  }

  get f() {  return this.form.controls; }
  
}
