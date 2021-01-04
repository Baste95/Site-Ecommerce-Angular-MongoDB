import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, AbstractControl} from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../../services/user/user.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-user-adress',
  templateUrl: './user-adress.component.html',
  styleUrls: ['./user-adress.component.css']
})
export class UserAdressComponent implements OnInit {
  signupForm;
  showPasswordValidation = false;
  showPassword = false;
  constructor(private formBuilder: FormBuilder, private User: UserService, private router: Router, private snackBar: MatSnackBar) {
    this.signupForm = this.formBuilder.group({
      adress: ["", Validators.required],
      adress2: "",
      city: ["", Validators.required],
      zip: ["", [Validators.required, Validators.pattern('^[0-9]*$')]],
      country: ["", Validators.required],
      county: ["", Validators.required],
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
        "fulladress":{
          "adress": form.value.adress,
          "adress2": form.value.adress2,
          "city": form.value.city,
          "zip": form.value.zip,
          "country": form.value.country,
          "county": form.value.county
        },
      }
      this.User.updateAdress(dataToSend).subscribe(
        (data: any) => {
          this.snackBar.open("Adresse mis à jour.", ":)", { duration: 3000 });
          this.logout();
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

  logout() {
    localStorage.removeItem('Token');
    this.router.navigate([ '/login' ]);
  } 
  get f() { return this.signupForm.controls; }

  
}
