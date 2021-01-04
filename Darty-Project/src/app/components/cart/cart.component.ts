import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../services/user/user.service';
import { ActivatedRoute } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  products = [];
  cartInformation = {price: null};
  constructor( private User: UserService, private snackBar: MatSnackBar, private route: ActivatedRoute,) { 
  }

  ngOnInit(): void {
    let cart = this.User.getCart();
    for(let i = 0; i < cart.length; i++){
      this.getProducts(cart[i].id);
      this.getPrice();
    }
  }

  getProducts(id): void{
    this.User.getProduct(id).subscribe(
      (data: any) => {
          this.products.push(data.productCredentials);
          console.log(this.products)
        },
      (err: HttpErrorResponse) => {
        console.log(err.error);
        if (err.error.msg) {
          console.log(err.error.msg === "Dont found categories");
          this.snackBar.open("Le produit n'existe pas", "Erreur" , { duration: 3000 });
        } else {
          console.log('Something Went Wrong!');
          this.snackBar.open("Erreur Serveur! Imposible de charger le produit.", "Erreur", { duration: 3000 });
        }
      }
    );
  }


  deleteToCart(id){
    this.User.deleteToCart(id);
    for(let i = 0; i < this.products.length; i++){
      if(this.products[i]._id === id){
        console.log(this.products);
        this.products.splice(i, 1);
        return;
      }
    }
  }

  getPrice(){
    this.cartInformation.price = this.User.getPrice();
  }

  


}