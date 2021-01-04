import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, AbstractControl} from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../../services/user/user.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {


  signupForm;
  showPasswordValidation = false;
  showPassword = false;
  constructor(private formBuilder: FormBuilder, private User: UserService, private router: Router, private snackBar: MatSnackBar) {
    this.signupForm = this.formBuilder.group({
      firstname: ["", Validators.required,],
      lastname: ["", Validators.required],
      phone: ["", Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?_&-])[A-Za-z\\d@$!%*?&_-]{8,}$')]],
      passwordvalidation: ["", Validators.required],
      adress: ["", Validators.required],
      adress2: "",
      city: ["", Validators.required],
      zip: ["", [Validators.required, Validators.pattern('^[0-9]*$')]],
      country: ["", Validators.required],
      county: ["", Validators.required],
      newsletter: false,
      terms: [false, Validators.requiredTrue]
    }, {validator: this.passwordConfirming});
   
   }

  passwordConfirming(c: AbstractControl): { invalid: boolean } {
    if (c.get('password').value !== c.get('passwordvalidation').value) {
        return {invalid: true};
    }
  }

  ngOnInit(): void {
    if (localStorage.getItem('Token') != null){
      this.router.navigate([ '/' ]);
    }
  }

  onSubmit(form){
    if(form.invalid){
      console.log(" invalid");
    }

    else{
      let dataToSend = {
        "firstname": form.value.firstname,
        "lastname": form.value.lastname,
        "email": form.value.email,
        "password": form.value.password,
        "phone": form.value.phone,
        "fulladress":{
          "adress": form.value.adress,
          "adress2": form.value.adress2,
          "city": form.value.city,
          "zip": form.value.zip,
          "country": form.value.country,
          "county": form.value.county
        },
        "newsletter": form.value.newsletter
      }
      this.User.createNewUser(dataToSend).subscribe(
        (data: any) => {
          console.log(data);
          this.router.navigate([ '/login' ]);
        },
        (err: HttpErrorResponse) => {
          if (err.error.msg) {
            console.log(err.error.msg);
            this.snackBar.open("Adresse mail déjà utilisé.", "Erreur");
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

  onClickPasswordValidation(){
    this.showPasswordValidation = !this.showPasswordValidation;
  }

  get f() { return this.signupForm.controls; }

}
