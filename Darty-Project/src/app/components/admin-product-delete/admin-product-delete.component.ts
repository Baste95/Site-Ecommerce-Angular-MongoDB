import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, AbstractControl} from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { AdminService } from '../../services/admin/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-product-delete',
  templateUrl: './admin-product-delete.component.html',
  styleUrls: ['./admin-product-delete.component.css']
})
export class AdminProductDeleteComponent implements OnInit {
  deleteProductForm;
  constructor(private formBuilder: FormBuilder, private Admin: AdminService, private snackBar: MatSnackBar, private router: Router) {
    this.deleteProductForm = this.formBuilder.group({
      name: ["", Validators.required]
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
        "name": form.value.name,
      }
      console.log(dataToSend);
      this.Admin.deleteProduct(dataToSend).subscribe(
        (data: any) => {
          console.log(data);
          this.snackBar.open("Produit supprimé.", "Succès", { duration: 3000 });
        },
        (err: HttpErrorResponse) => {
          if (err.error.msg) {
            console.log(err.error.msg);
            this.snackBar.open("Produit manquant.", "Erreur", { duration: 3000 });
          } else {
            console.log('Something Went Wrong!');
            this.snackBar.open("Erreur Serveur ou produit manquante.", "Erreur" , { duration: 3000 });
          }
        }
      );
    }
  }
    

  get f() { return this.deleteProductForm.controls; }

}