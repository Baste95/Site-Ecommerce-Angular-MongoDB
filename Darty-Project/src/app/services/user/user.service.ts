import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // Panier
  cart = [];

  addToCart(id, price){
    this.cart.push({"id" : id, "price" : price});  
  }

  deleteToCart(id){
    for(let i = 0; i  < this.cart.length; i++){
      if(this.cart[i].id === id){
        this.cart.splice(i, 1);
      }
    }
  }

  getPrice(){
    let finalPrice = 0;
    for(let i = 0; i  < this.cart.length; i++){
      if((typeof this.cart[i].price) === "string"){
        this.cart[i].price = parseFloat(this.cart[i].price);
      }
      finalPrice += this.cart[i].price;
    }
    finalPrice = parseFloat(finalPrice.toFixed(2));
    return finalPrice;
  }

  clearCart(){
    this.cart = [];
  }

  getCart(){
    return this.cart;
  }

  isInCart(id){
    for(let i = 0; i  < this.cart.length; i++){
      if(this.cart[i].id === id){
        return true;
      }
    }
    return false;
  }



  // Requetes Server
  createNewUser(payload) {
    return this.http.post(`${environment.baseURL}user/register`, payload);
  }
  userLogin(payload) {
    return this.http.post(`${environment.baseURL}user/login`, payload);
  }
  getProtectedData() {
    return this.http.get(`${environment.baseURL}user/data`);
  }
  getAllCatergories(){
    return this.http.get(`${environment.baseURL}categorie/getall`);
  }
  getCategory(payload){
    let id = payload.replace(" ", "-")
    return this.http.get(`${environment.baseURL}categorie/get/${id}`);
  }
  getProductsFromCategory(payload, page){
    let id = payload.replace(" ", "_")
    console.log("page == " + page);
    return this.http.get(`${environment.baseURL}product/getbycategorie/${id}/${page}`);
  }
  getProductsFromSubCategory(payload, page){
    let id = payload.replace(" ", "_")
    return this.http.get(`${environment.baseURL}product/getbysubcategorie/${id}/${page}`);
  }
  getProductsFromSearch(payload, cate){
    let id = payload.replace(" ", "_");
    if(cate){
      let c = cate.replace(" ", "_");
      return this.http.get(`${environment.baseURL}product/search/${id}/${c}`);
    }
    else{
      return this.http.get(`${environment.baseURL}product/search/${id}`);
    }
  }
  getNewsProducts(){
    return this.http.get(`${environment.baseURL}product/getnews`);
  }
  getProductsByPromotion(page){
    return this.http.get(`${environment.baseURL}product/getbyreduction/${page}`);
  }
  getProduct(payload){
    return this.http.get(`${environment.baseURL}product/get/${payload}`);
  }
  addOrder(payload){
    return this.http.post(`${environment.baseURL}order/add`, payload);
  }
  updateOrder(payload){
    return this.http.post(`${environment.baseURL}order/update`, payload);
  }
  getOrder(){
    return this.http.get(`${environment.baseURL}order/get`);
  }
  addNote(payload){
    return this.http.post(`${environment.baseURL}product/note`, payload);
  }
  updateAdress(payload){
    return this.http.post(`${environment.baseURL}user/updateadress`, payload);
  }
  updateMail(payload){
    return this.http.post(`${environment.baseURL}user/updatemail`, payload);
  }
  getNewsProductsHome(){
    return this.http.get(`${environment.baseURL}product/getnewshome`);
  }
  getProductsByPromotionHome(){
    return this.http.get(`${environment.baseURL}product/getbyreductionhome`);
  }
  getRecommendations(){
    return this.http.get(`${environment.baseURL}order/getrecommendation`);
  }
    

  constructor(private http: HttpClient) { }
}
