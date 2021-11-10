import { Injectable, NgZone } from '@angular/core';
import { User } from "../services/user";
import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  public userData: any; // Save logged in user data
 

  constructor(
    public afs: AngularFirestore,   // Inject Firestore service
    public afAuth: AngularFireAuth , // Inject Firebase auth service
    public router: Router,  
    public ngZone: NgZone, // NgZone service to remove outside scope warning
    public snackBar: MatSnackBar
  ) {    
    /* Saving user data in localstorage when 
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe(user => {
     
      if (user) {
      
       
        this.userData = user;
      
        localStorage.clear();
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user') || 'null');
      } else {
        localStorage.setItem('user', '');
        JSON.parse(localStorage.getItem('user') || 'null');
      }
    })
  }


  // Sign in with email/password
  SignIn(email:any, password:any) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((result) => {
       
   
      
        this.ngZone.run(() => {
          this.SetUserData(result.user);
        if(result.user!.emailVerified==false){

          this.snackBar.open(`Please Verify Your Email To login`, '', {
            duration: 5000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: 'error-notify'
          });
        }else{
          this.snackBar.open(`Login Success Welcome ${result.user!.displayName!=null ? result.user!.displayName : ``}`, '', {
            duration: 5000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: 'login-notify'
          });

        }
        
        setTimeout(()=>{
            this.router.navigate(['dashboard']);

        },1000);
     
       
        })
       
      }).catch((error) => {
        
        this.snackBar.open(error.message, '', {
          duration: 5000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: 'error-notify'
        });
      })
  }



  // Sign up with email/password
  SignUp(email:any, password:any) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign 
        up and returns promise */
        this.snackBar.open('Signup Success, Verification Link send to your Email, please verify to login', '', {
          duration: 5000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: 'login-notify'
        });
        this.SendVerificationMail();
        this.SetUserData(result.user);
        this.router.navigate(['']);
      }).catch((error) => {
       
        this.snackBar.open(error.message, '', {
          duration: 5000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: 'error-notify'
        });
      })
  }

  // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    return this.afAuth.auth.currentUser!.sendEmailVerification();
  }

  // Reset Forggot password
  ForgotPassword(passwordResetEmail:any) {
    return this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail)
    .then(() => {
     

      this.snackBar.open('Password reset email sent, check your inbox.', '', {
        duration: 5000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: 'login-notify'
      });
      setTimeout(()=>{
      this.router.navigate(['']);

      },1000);
    }).catch((error) => {
      this.snackBar.open(error.message, '', {
        duration: 5000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: 'error-notify'
      });
    })
  }


  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider()).then(()=>{

      return true;
    }).catch(()=>{

      return false;
    });
  }

  // Auth logic to run auth providers
  AuthLogin(provider:any) {
    return this.afAuth.auth.signInWithPopup(provider)
    .then((result) => {
       this.ngZone.run(() => {
     
        this.SetUserData(result.user);

        setTimeout(()=>{
        this.router.navigate(['dashboard']);

        },1000);
        

       
        if(result.user!.emailVerified==false){

          this.snackBar.open(`Please Verify Your Email To login`, '', {
            duration: 5000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: 'error-notify'
          });
        }else{
        this.snackBar.open(`Login Success Welcome ${result.user!.displayName!=null ? result.user!.displayName : ``}`, '', {
          duration: 5000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: 'login-notify'
        });

       

      }
     
    

     
        })

       
     
    }).catch((error) => {
      this.snackBar.open(error.message, '', {
        duration: 5000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: 'error-notify'
      });

      
      
    })
  }

  /* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth  
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */

  UpdateLocalStorage(){

    this.afAuth.authState.subscribe(user => {
     
      if (user) {
      
       
        this.userData = user;
     
        localStorage.clear();
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user') || 'null');
      } else {
        localStorage.setItem('user', '');
        JSON.parse(localStorage.getItem('user') || 'null');
      }
    })
  }
  SetUserData(user:any) {
    let userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);

 
    
    let userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    }

   
this.UpdateLocalStorage();
   
  
    return userRef.set(userData, {
      merge: true
    })


    
  }

    // Returns true when user is looged in and email is verified
get isLoggedIn(): boolean {
  let user = JSON.parse(localStorage.getItem('user')|| 'null');


 
  return (user != null && user.emailVerified != false) ? true : false;
}

  // Sign out 
  SignOut() {
    return this.afAuth.auth.signOut().then(() => {
      localStorage.removeItem('user');
      this.snackBar.open('Logout Success', '', {
        duration: 5000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: 'login-notify'
      });
      this.router.navigate(['']).then();
    })
  }

}