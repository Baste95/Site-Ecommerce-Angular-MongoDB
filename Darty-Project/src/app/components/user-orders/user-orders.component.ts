import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../services/user/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.css']
})
export class UserOrdersComponent implements OnInit {
  orders = [];
  products = [] ;

  constructor(private User: UserService, private snackBar: MatSnackBar, private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.getOrder();
  }

  getOrder(){
    this.User.getOrder().subscribe(
      (data: any) => {
        this.orders = data.orderCredentials;
        //console.log(data);
        this.pushProducts(data.orderCredentials);
      },
      (err: HttpErrorResponse) => {
        console.log(err.error);
        if (err.error.msg) {
          this.snackBar.open("Erreur requete", "Erreur" , { duration: 3000 });
        } else {
          console.log('Something Went Wrong!');
          this.snackBar.open("Erreur Serveur! Imposible de charger les commandes.", "Erreur", { duration: 3000 });
        }
      }
    );
  }

  getProducts(id, price, index){
    this.User.getProduct(id).subscribe(
      (data: any) => {
      
      this.products[index].push({name: data.productCredentials.name, image: data.productCredentials.mainimage, price: price, id: id})
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
  

  pushProducts(array){
    //console.log(array);
    for(let i = 0; i < array.length; i++){
      this.products.push([]);
      for(let u = 0; u < array[i].product.id_product.length; u++){
        //console.log(array[i].product.id_product[u]);
        this.getProducts(array[i].product.id_product[u], array[i].product.price_product[u], i);
      }

      
    }
    console.log(this.products);
  }

  GiveNote(note, id){
    
    let dataToSend = {id: id, note: note};
    this.User.addNote(dataToSend).subscribe(
      (data: any) => {
        this.snackBar.open("Vous avez donnez la note de " + note, "Merci" , { duration: 3000 });
      },
    (err: HttpErrorResponse) => {
      console.log(err.error);
      if (err.error.msg) {
        this.snackBar.open("Notation impossible", "Erreur" , { duration: 3000 });
      } else {
        console.log('Something Went Wrong!');
        this.snackBar.open("Erreur serveur.", "Erreur", { duration: 3000 });
      }
    }
  );
  }
  

}
