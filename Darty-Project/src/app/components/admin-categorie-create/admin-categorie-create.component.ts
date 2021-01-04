import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, AbstractControl} from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { AdminService } from '../../services/admin/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-categorie-create',
  templateUrl: './admin-categorie-create.component.html',
  styleUrls: ['./admin-categorie-create.component.css']
})
export class AdminCategorieCreateComponent implements OnInit {
  addCategorieForm;
  constructor(private formBuilder: FormBuilder, private Admin: AdminService, private snackBar: MatSnackBar, private router: Router) {
    this.addCategorieForm = this.formBuilder.group({
      name: ["", Validators.required],
      description: ["", Validators.required],
      subcategories: ["", Validators.required],
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
        "description": form.value.description,
        "subcategories": form.value.subcategories.split(";")
      }
      this.Admin.addCategorie(dataToSend).subscribe(
        (data: any) => {
          console.log(data);
          this.snackBar.open("Catégorie ajouté.", "Succès", { duration: 3000 });
        },
        (err: HttpErrorResponse) => {
          if (err.error.msg) {
            console.log(err.error.msg);
            this.snackBar.open("Catégorie déjà existante.", "Erreur", { duration: 3000 });
          } else {
            console.log('Something Went Wrong!');
            this.snackBar.open("Erreur Serveur ou catégorie déjà existante.", "Erreur" , { duration: 3000 });
          }
        }
      );
    }
  }
    

  get f() { return this.addCategorieForm.controls; }

}
