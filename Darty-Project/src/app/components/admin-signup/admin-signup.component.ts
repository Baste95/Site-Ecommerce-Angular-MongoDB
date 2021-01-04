import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, AbstractControl} from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { AdminService } from '../../services/admin/admin.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-signup',
  templateUrl: './admin-signup.component.html',
  styleUrls: ['./admin-signup.component.css']
})
export class AdminSignupComponent implements OnInit {
  signupForm;
  showPasswordValidation = false;
  showPassword = false;
  constructor(private formBuilder: FormBuilder, private Admin: AdminService, private router: Router, private snackBar: MatSnackBar) {
    this.signupForm = this.formBuilder.group({
      user: ["", Validators.required],
      password: ["", [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?_&-])[A-Za-z\\d@$!%*?&_-]{8,}$')]],
      passwordvalidation: ["", Validators.required],
    }, {validator: this.passwordConfirming});
   
   }

  passwordConfirming(c: AbstractControl): { invalid: boolean } {
    if (c.get('password').value !== c.get('passwordvalidation').value) {
        return {invalid: true};
    }
  }

  ngOnInit(): void {
    if (localStorage.getItem('TokenAdmin') === null){
      this.router.navigate([ '/' ]);
    }
  }

  onSubmit(form){
    if(form.invalid){
      console.log(" invalid");
    }

    else{
      let dataToSend = {
        "user": form.value.user,
        "password": form.value.password,
      }
      this.Admin.createNewAdmin(dataToSend).subscribe(
        (data: any) => {
          console.log(data);
          this.router.navigate([ '/admin/profil' ]);
        },
        (err: HttpErrorResponse) => {
          if (err.error.msg) {
            console.log(err.error.msg);
            this.snackBar.open("Identifiant déjà utilisé.", "Erreur", { duration: 3000 });
          } else {
            console.log('Something Went Wrong!');
            this.snackBar.open("Erreur Serveur.", "Erreur", { duration: 3000 });
          }
        }
      );
    }
    
    
    
  }

  onClickPassword(){
    this.showPassword = !this.showPassword;
  }

  onClickPasswordValidation(){
    this.showPasswordValidation = !this.showPasswordValidation;
  }

  get f() { return this.signupForm.controls; }
}
