import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../../services/user/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  searchForm;

  categories = [
      
  ];
     
  constructor(private formBuilder: FormBuilder, private User: UserService, private router: Router, private snackBar: MatSnackBar) {
    this.searchForm = this.formBuilder.group({
      category: ["Toutes les catégories", Validators.required],
      product: ["", Validators.required],
    });

    this.User.getAllCatergories().subscribe(
      (data: any) => {
        this.incrementSearchBar(data.categoriesCredentials);
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

    window.onclick = (event: MouseEvent) => {
      const event_cast_type = event as any;
      if (!event_cast_type.target.matches('.dropbtn')) {
      var myDropdown = document.getElementById("myDropdown");
      this.HideSecondMenu()
        if (myDropdown.classList.contains('show')) {
          myDropdown.classList.remove('show');
        }
      }
    }
   }


  ngOnInit(): void {
  }

  onSubmit(searchData){
    if(searchData.category === "Toutes les catégories"){
      this.router.navigate(["/search",searchData.product]);
    }
    else{
      this.router.navigate(["/search", searchData.product, searchData.category]);
    }
  }


  incrementSearchBar(data){
    for(let i = 0; i < data.length; i++){
      this.categories.push({name: data[i].name, sub : data[i].subcategories});
    } 
  }

  ShowMenu(){
    document.getElementById("myDropdown").classList.toggle("show");
  }

  ShowSecondMenu(element){
    this.HideSecondMenu();
    document.getElementById(element).classList.toggle("show2");
    document.getElementById("myDropdown").classList.remove("show");
  }

  HideSecondMenu(){
    for(let i = 0; i < this.categories.length; i++){
      let secondDropDown = document.getElementById(this.categories[i].name)
      if (secondDropDown.classList.contains('show2')) {
        secondDropDown.classList.remove('show2');
      }
    }
  }

  

  
  
}
