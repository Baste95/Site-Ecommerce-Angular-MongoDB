import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { HttpConfigInterceptor } from '../../src/app/interceptor/httpconfig.interceptor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { ProfilComponent } from './components/profil/profil.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { BottomComponent } from './components/bottom/bottom.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { AdminSignupComponent } from './components/admin-signup/admin-signup.component';
import { AdminProfilComponent } from './components/admin-profil/admin-profil.component';
import { AdminCategorieCreateComponent } from './components/admin-categorie-create/admin-categorie-create.component';
import { AdminCategorieUpdateComponent } from './components/admin-categorie-update/admin-categorie-update.component';
import { AdminCategorieDeleteComponent } from './components/admin-categorie-delete/admin-categorie-delete.component';
import { AdminProductCreateComponent } from './components/admin-product-create/admin-product-create.component';
import { AdminProductDeleteComponent } from './components/admin-product-delete/admin-product-delete.component';
import { AdminProductUpdateComponent } from './components/admin-product-update/admin-product-update.component';
import { CategoryComponent } from './components/category/category.component';
import { ProductComponent } from './components/product/product.component';
import { SubcategoryComponent } from './components/subcategory/subcategory.component';
import { SearchComponent } from './components/search/search.component';
import { NewsComponent } from './components/news/news.component';
import { SalesComponent } from './components/sales/sales.component';
import { CartComponent } from './components/cart/cart.component';
import { OrderComponent } from './components/order/order.component';
import { AdminOrderUpdateComponent } from './components/admin-order-update/admin-order-update.component';
import { AdminOrderDeleteComponent } from './components/admin-order-delete/admin-order-delete.component';
import { UserOrdersComponent } from './components/user-orders/user-orders.component';
import { AboutComponent } from './components/about/about.component';
import { UserAdressComponent } from './components/user-adress/user-adress.component';
import { UserEmailComponent } from './components/user-email/user-email.component';


@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    ProfilComponent,
    HomeComponent,
    HeaderComponent,
    BottomComponent,
    AdminLoginComponent,
    AdminSignupComponent,
    AdminProfilComponent,
    AdminCategorieCreateComponent,
    AdminCategorieUpdateComponent,
    AdminCategorieDeleteComponent,
    AdminProductCreateComponent,
    AdminProductDeleteComponent,
    AdminProductUpdateComponent,
    CategoryComponent,
    ProductComponent,
    SubcategoryComponent,
    SearchComponent,
    NewsComponent,
    SalesComponent,
    CartComponent,
    OrderComponent,
    AdminOrderUpdateComponent,
    AdminOrderDeleteComponent,
    UserOrdersComponent,
    AboutComponent,
    UserAdressComponent,
    UserEmailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MatIconModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSnackBarModule
  ],
  providers: [
    {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpConfigInterceptor,
            multi: true
        }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
