import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../../services/user/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm;
  showPassword = false;
  constructor(private formBuilder: FormBuilder, private User: UserService, private router: Router, private snackBar: MatSnackBar) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ["", Validators.required],
    });
  }

  ngOnInit(): void {
    if (localStorage.getItem('Token') != null){
      this.router.navigate([ '/profil' ]);
    }
  }

  onSubmit(form){
    if(form.invalid){
      console.log(" invalid");
    }
    else{
      this.User.userLogin(form.value).subscribe(
        (data: any) => {
          let token = data.token;
          localStorage.setItem('Token', token);
          this.router.navigate([ '/' ]);
        },
        (err: HttpErrorResponse) => {
          console.log(err.error);
          if (err.error.msg) {
            console.log(err.error.msg);
            this.snackBar.open("Identifiant ou mot de passe incorrect.", "Erreur");
          } else {
            console.log('Something Went Wrong!');
            this.snackBar.open("Erreur Serveur.", "Erreur");
          }
        }
      );
    }
  }

  onClickPassword(){
    this.showPassword = !this.showPassword;
  }


}
