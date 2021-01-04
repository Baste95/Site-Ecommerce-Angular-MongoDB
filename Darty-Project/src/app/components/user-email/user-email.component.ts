import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, AbstractControl} from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../../services/user/user.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-email',
  templateUrl: './user-email.component.html',
  styleUrls: ['./user-email.component.css']
})
export class UserEmailComponent implements OnInit {
  signupForm;
  showPasswordValidation = false;
  showPassword = false;
  constructor(private formBuilder: FormBuilder, private User: UserService, private router: Router, private snackBar: MatSnackBar) {
    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      newemail: ['', [Validators.required, Validators.email]],
    });
   
   }

 
  ngOnInit(): void {
  }

  onSubmit(form){
    if(form.invalid){
      console.log(" invalid");
    }

    else{
      let dataToSend = {
        "email": form.value.email,
        "newemail": form.value.newemail,
      }
      this.User.updateMail(dataToSend).subscribe(
        (data: any) => {
          this.snackBar.open("Adresse mail mis à jour.", ":)", { duration: 3000 });
          this.logout();
        },
        (err: HttpErrorResponse) => {
          if (err.error.msg) {
            console.log(err.error.msg);
            this.snackBar.open("Identifiant incorect.", "Erreur", { duration: 3000 });
          } else {
            console.log('Something Went Wrong!');
            this.snackBar.open("Erreur Serveur.", "Erreur", { duration: 3000 });
          }
        }
      );
    }    
    
  }

  logout() {
    localStorage.removeItem('Token');
    this.router.navigate([ '/login' ]);
  } 
  get f() { return this.signupForm.controls; }

  
}
