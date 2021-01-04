import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../../services/user/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  orderForm;
  isOrder = false;
  information = {idUser: null, price: null, idProducts: [], priceProducts: []}
  
  constructor(private formBuilder: FormBuilder, private User: UserService, private router: Router, private snackBar: MatSnackBar) {
    this.orderForm = this.formBuilder.group({
      typecart: ['', Validators.required],
      numbercart: ["", [Validators.required, Validators.pattern('^\\d{16}$')]],
      cvv: ["", [Validators.required,  Validators.pattern('^\\d{3}$')]],
    });
  }

  ngOnInit(): void {
    let cart = this.User.getCart();
    if(cart.length === 0){
      this.router.navigate([ '/' ]);
    }
    this.getInfoCart(cart);
  }

  getInfoCart(cart){
    for(let i = 0; i < cart.length; i++){
      console.log("le cart ==== " + cart[i].id);
      this.information.idProducts.push(cart[i].id);
      if((typeof cart[i].price) === "string"){
        this.information.priceProducts.push(parseFloat(cart[i].price));
      }
      else{
        this.information.priceProducts.push(cart[i].price);
      }
      
    }
    this.information.price = this.User.getPrice();
    console.log(this.information);
  }

  onSubmit(form){
    if(form.invalid){
      console.log(" invalid");
    }
    else{
      let dataToSend = {
        product : {
          id_product: this.information.idProducts,
          price_product: this.information.priceProducts
        },
        finalprice: this.information.price,
        cart: {
          lastnumber: form.value.numbercart,
          typecart: form.value.typecart
        }
      }
      
      this.User.addOrder(dataToSend).subscribe(
        (data: any) => {
          console.log(data);
          this.isOrder = true;
        },
        (err: HttpErrorResponse) => {
          console.log(err.error);
          if (err.error.msg) {
            console.log(err.error.msg);
            this.snackBar.open("Commande non valide.", "Erreur");
          } else {
            console.log('Something Went Wrong!');
            this.snackBar.open("Erreur Serveur.", "Erreur");
          }
        }
      );
    }
  }

  goToOrder(){
    this.router.navigate([ '/order' ]);
  }

  
}
