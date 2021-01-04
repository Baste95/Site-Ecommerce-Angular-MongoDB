import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, AbstractControl} from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { AdminService } from '../../services/admin/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-categorie-update',
  templateUrl: './admin-categorie-update.component.html',
  styleUrls: ['./admin-categorie-update.component.css']
})
export class AdminCategorieUpdateComponent implements OnInit {
  updateCategorieForm;
  constructor(private formBuilder: FormBuilder, private Admin: AdminService, private snackBar: MatSnackBar) {
    this.updateCategorieForm = this.formBuilder.group({
      name: ["", Validators.required],
      newname: ["", Validators.required],
      description: ["", Validators.required],
      subcategories: ["", Validators.required],
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
        "name": form.value.name,
        "newname": form.value.newname,
        "description": form.value.description,
        "subcategories": form.value.subcategories.split(";")
      }
      this.Admin.updateCategorie(dataToSend).subscribe(
        (data: any) => {
          console.log(data);
          this.snackBar.open("Catégorie mis à jour.", "Succès", { duration: 3000 });
        },
        (err: HttpErrorResponse) => {
          if (err.error.msg) {
            console.log(err.error.msg);
            this.snackBar.open("Catégorie manquante.", "Erreur", { duration: 3000 });
          } else {
            console.log('Something Went Wrong!');
            this.snackBar.open("Erreur Serveur ou catégorie manquante.", "Erreur" , { duration: 3000 });
          }
        }
      );
    }
  }
    

  get f() { return this.updateCategorieForm.controls; }

}