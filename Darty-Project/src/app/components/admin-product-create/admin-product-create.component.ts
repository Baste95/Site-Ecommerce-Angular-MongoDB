import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, AbstractControl} from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { AdminService } from '../../services/admin/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../services/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-product-create',
  templateUrl: './admin-product-create.component.html',
  styleUrls: ['./admin-product-create.component.css']
})
export class AdminProductCreateComponent implements OnInit {
  addProductForm;
  mainimage = null;
  secondaryimage = null;
  categoriesForm = [];
  subcategoriesForm = [];
  constructor(private formBuilder: FormBuilder, private User: UserService, private Admin: AdminService, private snackBar: MatSnackBar, private routre: Router) {
    this.addProductForm = this.formBuilder.group({
      name: ["", Validators.required],
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
      console.log(this.secondaryimage);
    }

    else{
      let dataToSend = {
        "name": form.value.name,
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
      this.Admin.addProduct(dataToSend).subscribe(
        (data: any) => {
          console.log(data);
          this.snackBar.open("Produit ajouté.", "Succès", { duration: 3000 });
        },
        (err: HttpErrorResponse) => {
          if (err.error.msg) {
            console.log(err.error.msg);
            this.snackBar.open("Produit déjà existant.", "Erreur", { duration: 3000 });
          } else {
            console.log('Something Went Wrong!');
            this.snackBar.open("Erreur Serveur ou produit déjà existante.", "Erreur" , { duration: 3000 });
          }
        }
      );
    }
  }
    

  get f() { return this.addProductForm.controls; }

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
  console.log('Second' + this.secondaryimage);
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
