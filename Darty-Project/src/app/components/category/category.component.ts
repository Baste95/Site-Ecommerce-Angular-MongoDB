import { Component, OnInit, HostListener } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../services/user/user.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  
  products = [];
  private page = 0;
  private leftProducts = true;
  categoryInformation = {name: null, description: null};
  constructor( private User: UserService, private snackBar: MatSnackBar, private route: ActivatedRoute,) { 
  }

  ngOnInit(): void {
    this.route.params.subscribe(routeParams => {
      this.getCategoryInfo(routeParams.id);
      this.page = 0;
      this.products = [];
      this.getProducts(routeParams.id);
    });
  }

  getProducts(id): void{
    this.User.getProductsFromCategory(id, this.page).subscribe(
      (data: any) => {
        this.page++;
        if(data.productsCredentials.length === 0){
          this.leftProducts = false;
        }
        else{
          data.productsCredentials = this.changeNote(data.productsCredentials);
          this.products = this.products.concat(data.productsCredentials);
          console.log(data.productsCredentials)
        }
      },
      (err: HttpErrorResponse) => {
        console.log(err.error);
        if (err.error.msg) {
          console.log(err.error.msg === "Dont found categories");
          this.snackBar.open("La catégorie n'existe pas", "Erreur" , { duration: 3000 });
        } else {
          console.log('Something Went Wrong!');
          this.snackBar.open("Erreur Serveur! Imposible de charger la catégorie.", "Erreur", { duration: 3000 });
        }
      }
    );
  }

  getCategoryInfo(id): void{
    this.User.getCategory(id).subscribe(
      (data: any) => {
        this.categoryInformation.name = data.categoriesCredentials.name;
        this.categoryInformation.description = data.categoriesCredentials.description;
      },
      (err: HttpErrorResponse) => {
        console.log(err.error);
        if (err.error.msg) {
          console.log(err.error.msg === "Dont found categories");
          this.snackBar.open("La catégorie n'existe pas", "Erreur" , { duration: 3000 });
        } else {
          console.log('Something Went Wrong!');
          this.snackBar.open("Erreur Serveur! Imposible de charger la catégorie.", "Erreur", { duration: 3000 });
        }
      }
    );
  }

  onAddToCart(id, price){
    if(this.User.isInCart(id)){
      this.snackBar.open("Produit déjà dans le panier !", "" , { duration: 3000 });
      return;
    }
    this.User.addToCart(id, price);
    console.log(this.User.getCart());
    this.snackBar.open("Produit Ajouté", ":)" , { duration: 3000 });
  }


  @HostListener("window:scroll", ["$event"])
  onWindowScroll() {
    //In chrome and some browser scroll is given to body tag
    let pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
    let max = document.documentElement.scrollHeight;
    // pos/max will give you the distance between scroll bottom and and bottom of screen in percentage.
    if(pos == max )   {
      if(this.leftProducts === true){
        this.getProducts(this.categoryInformation.name);
      }
    }
  }


  changeNote(array){
    for(let i = 0; i < array.length; i++){
      if(!array[i].note[0]){
        break;
      }
      array[i].note = this.average(array[i].note);
    }
    return array;
  }

  average(array){
    let sum = 0;
    for(let i = 0; i < array.length; i++){
      sum += array[i];
    }
    let result = (sum / array.length).toFixed(2);
    return result + " / 5    ( " + array.length + " votes )"
  }

}
