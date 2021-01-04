import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AdminService } from '../../services/admin/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  loginForm;
  showPassword = false;
  constructor(private formBuilder: FormBuilder, private Admin: AdminService, private router: Router, private snackBar: MatSnackBar) {
    this.loginForm = this.formBuilder.group({
      user: ['', Validators.required],
      password: ["", Validators.required],
    });
  }

  ngOnInit(): void {
    if (localStorage.getItem('TokenAdmin') != null){
      this.router.navigate([ '/admin/profil' ]);
    }
  }

  onSubmit(form){
    if(form.invalid){
      console.log(" invalid");
    }
    else{
      this.Admin.userAdminLogin(form.value).subscribe(
        (data: any) => {
          let token = data.tokenadmin;
          localStorage.setItem('TokenAdmin', token);
          this.router.navigate([ '/admin/profil' ]);
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
