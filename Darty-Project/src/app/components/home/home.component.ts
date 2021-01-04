import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../services/user/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  news = [];
  sales = [];
  recommendations = [];

  constructor(private User: UserService, private snackBar: MatSnackBar, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getSales();
    this.getNews();
    if(localStorage.getItem('Token') != null){
      this.getRecommendations();
    }
  }

  getSales(){
    this.User.getProductsByPromotionHome().subscribe(
      (data: any) => {
        this.sales = data.productsCredentials;
        console.log(data.productsCredentials);
        },
      (err: HttpErrorResponse) => {
        console.log(err.error);
        if (err.error.msg) {
          this.snackBar.open("Les produits n'existe pas", "Erreur" , { duration: 3000 });
        } else {
          console.log('Something Went Wrong!');
          this.snackBar.open("Erreur Serveur.", "Erreur", { duration: 3000 });
        }
      }
    );
  }

  getNews(){
    this.User.getNewsProductsHome().subscribe(
      (data: any) => {
        this.news = data.productsCredentials;
        console.log(data.productsCredentials);
        },
      (err: HttpErrorResponse) => {
        console.log(err.error);
        if (err.error.msg) {
          this.snackBar.open("Les produits n'existe pas", "Erreur" , { duration: 3000 });
        } else {
          console.log('Something Went Wrong!');
          this.snackBar.open("Erreur Serveur.", "Erreur", { duration: 3000 });
        }
      }
    );
  }

  getRecommendations(){
    this.User.getRecommendations().subscribe(
      (data: any) => {
        this.recommendations = data.productsCredentials;
        console.log(data.productsCredentials);
        },
      (err: HttpErrorResponse) => {
        console.log(err.error);
        if (err.error.msg) {
          this.snackBar.open("Les produits n'existe pas", "Erreur" , { duration: 3000 });
        } else {
          console.log('Something Went Wrong!');
          this.snackBar.open("Erreur Serveur.", "Erreur", { duration: 3000 });
        }
      }
    );

  }

}
