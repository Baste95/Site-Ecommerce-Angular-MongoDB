import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../../services/user/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-order-update',
  templateUrl: './admin-order-update.component.html',
  styleUrls: ['./admin-order-update.component.css']
})
export class AdminOrderUpdateComponent implements OnInit {
  orderForm;
  
  
  constructor(private formBuilder: FormBuilder, private User: UserService, private router: Router, private snackBar: MatSnackBar) {
    this.orderForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ["", Validators.required],
    });
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
        id : form.value.name,
        description: form.value.description
      }
      
      this.User.updateOrder(dataToSend).subscribe(
        (data: any) => {
          this.snackBar.open("Commande modifié.", "Erreur", {duration: 3000});
        },
        (err: HttpErrorResponse) => {
          console.log(err.error);
          if (err.error.msg) {
            console.log(err.error.msg);
            this.snackBar.open("Commande non trouvé.", "Erreur", {duration: 3000});
          } else {
            console.log('Something Went Wrong!');
            this.snackBar.open("Erreur Serveur.", "Erreur", {duration: 3000});
          }
        }
      );
    }
  }

 

  
}