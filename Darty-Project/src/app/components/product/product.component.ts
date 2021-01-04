import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../services/user/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  product = null;
  imagePrincipal = null;
  constructor(private User: UserService, private snackBar: MatSnackBar, private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.route.params.subscribe(routeParams => {
      this.getProduct(routeParams.id);
    });
  }

  getProduct(id): void{
    this.User.getProduct(id).subscribe(
      (data: any) => {
        data.productCredentials = this.changeNote(data.productCredentials);
        this.product = data.productCredentials;
        this.imagePrincipal = this.product.mainimage;
        console.log(data.productCredentials);
        },
      (err: HttpErrorResponse) => {
        console.log(err.error);
        if (err.error.msg) {
          this.snackBar.open("Le produit n'existe pas", "Erreur" , { duration: 3000 });
        } else {
          console.log('Something Went Wrong!');
          this.snackBar.open("Le produit n'existe pas.", "Erreur", { duration: 3000 });
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

  changeImage(ref){
    this.imagePrincipal = ref;
  }

  changeNote(array){
    if(array.note[0]){
      array.note = this.average(array.note);
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
