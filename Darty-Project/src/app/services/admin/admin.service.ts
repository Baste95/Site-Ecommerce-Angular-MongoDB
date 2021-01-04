import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AdminService {
  createNewAdmin(payload) {
    return this.http.post(`${environment.baseURL}admin/register`, payload);
  }

  userAdminLogin(payload) {
    return this.http.post(`${environment.baseURL}admin/login`, payload);
  }

  addCategorie(payload){
    return this.http.post(`${environment.baseURL}categorie/add`, payload);
  }

  updateCategorie(payload){
    return this.http.post(`${environment.baseURL}categorie/update`, payload);
  }

  deleteCategorie(payload){
    return this.http.post(`${environment.baseURL}categorie/delete`, payload);
  }

 addProduct(payload){
    return this.http.post(`${environment.baseURL}product/add`, payload);
  }

  deleteProduct(payload){
    return this.http.post(`${environment.baseURL}product/delete`, payload);
  }

  updateProduct(payload){
    return this.http.post(`${environment.baseURL}product/update`, payload);
  }

  deleteOrder(payload){
    return this.http.post(`${environment.baseURL}order/delete`, payload);
  }


  constructor(private http: HttpClient) { }
}
