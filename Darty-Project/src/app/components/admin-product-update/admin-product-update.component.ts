import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, AbstractControl} from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { AdminService } from '../../services/admin/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../services/user/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-admin-product-update',
  templateUrl: './admin-product-update.component.html',
  styleUrls: ['./admin-product-update.component.css']
})
export class AdminProductUpdateComponent implements OnInit {
  updateProductForm;
  mainimage = null;
  secondaryimage = null;
  categoriesForm = [];
  subcategoriesForm = [];
  constructor(private formBuilder: FormBuilder, private User: UserService, private Admin: AdminService, private snackBar: MatSnackBar, private router: Router) {
    this.updateProductForm = this.formBuilder.group({
      name: ["", Validators.required],
      newname: ["", Validators.required],
      description: ["", Validators.required],
      shortdescription: ["", Validators.required],
      features: ["", Validators.required],
      price: ["", [Validators.required, Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$')]],
      stock: ["", [Validators.required, Validators.pattern('^[0-9]+$')]],
      brand:["", Validators.required],
      reduction:["", Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$')],
      categorie: ["", Validators.required],
      subcategorie: ["", Validators.required],
      mainimage: ["", Validators.required],
      secondaryimage: [""],
    });

    this.User.getAllCatergories().subscribe(
      (data: any) => {
        console.log(data);
        this.getCategoriesForm(data.categoriesCredentials);
      },
      (err: HttpErrorResponse) => {
        console.log(err.error);
        if (err.error.msg) {
          console.log(err.error.msg);
          this.snackBar.open("Erreur Serveur! Imposible de charger les catégories.", "Erreur" , { duration: 3000 });
        } else {
          console.log('Something Went Wrong!');
          this.snackBar.open("Erreur Serveur! Imposible de charger les catégories.", "Erreur", { duration: 3000 });
        }
      }
    );
   
  }

  ngOnInit(): void {
    if (localStorage.getItem('TokenAdmin') === null){
      this.router.navigate([ '/' ]);
    }
  }

  onSubmit(form){
    if(form.invalid){
      console.log(form);
    }

    else{
      let dataToSend = {
        "name": form.value.name,
        "newname": form.value.newname,
        "description": form.value.description,
        "shortdescription": form.value.shortdescription,
        "features": form.value.features.split(";"),
        "price": form.value.price,
        "stock": form.value.stock,
        "brand": form.value.brand,
        "reduction": form.value.reduction,
        "categorie": form.value.categorie,
        "subcategorie": form.value.subcategorie,
        "mainimage": this.mainimage,
        "secondaryimage": this.secondaryimage
      }
      this.Admin.updateProduct(dataToSend).subscribe(
        (data: any) => {
          console.log(data);
          this.snackBar.open("Produit mis à jour.", "Succès", { duration: 3000 });
        },
        (err: HttpErrorResponse) => {
          if (err.error.msg) {
            console.log(err.error.msg);
            this.snackBar.open("Le produit n'existe pas.", "Erreur", { duration: 3000 });
          } else {
            console.log('Something Went Wrong!');
            this.snackBar.open("Erreur Serveur ou produit non existant.", "Erreur" , { duration: 3000 });
          }
        }
      );
    }
  }
    

  get f() { return this.updateProductForm.controls; }

getBase64(file) : any {
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = this._handleReaderLoaded.bind(this);
  reader.onerror = function (error) {
    console.log('Error: ', error);
  };
 }

 _handleReaderLoaded(e) {
  let reader = e.target;
  this.mainimage = reader.result;
  console.log(this.mainimage);
}

 getBase64Second(file) : any {
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = this._handleReaderLoadedSecond.bind(this);
  reader.onerror = function (error) {
    console.log('Error: ', error);
  };
 }

 _handleReaderLoadedSecond(e) {
  let reader = e.target;
  this.secondaryimage = reader.result;
  console.log(this.secondaryimage);
}


 getMainImage(event){
   this.getBase64(event.target.files[0]);
 }

 getSecondaryImage(event){
  this.getBase64Second(event.target.files[0]);
 }

 getCategoriesForm(data){
  for(let i = 0; i < data.length; i++){
    this.categoriesForm.push({name: data[i].name, sub : data[i].subcategories});
  } 
 }

 changeSubcategories(event){
   console.log(event);
   for(let i = 0; i < this.categoriesForm.length; i++){
     if(this.categoriesForm[i].name === event){
       this.subcategoriesForm = this.categoriesForm[i].sub;
       console.log(this.subcategoriesForm);
       break;
     }
   }
  }

}
