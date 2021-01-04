import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../services/user/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  products = []
  private leftProducts = true;
  categoryInformation = {name: null, description: null};
  constructor( private User: UserService, private snackBar: MatSnackBar, private route: ActivatedRoute,) { 
  }

  ngOnInit(): void {
    this.products = [];
    this.getProducts();
  }

  getProducts(): void{
    this.User.getNewsProducts().subscribe(
      (data: any) => {
        if(!data){
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

  onAddToCart(id, price){
    if(this.User.isInCart(id)){
      this.snackBar.open("Produit déjà dans le panier !", "" , { duration: 3000 });
      return;
    }
    this.User.addToCart(id, price);
    console.log(this.User.getCart());
    this.snackBar.open("Produit Ajouté", ":)" , { duration: 3000 });
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
