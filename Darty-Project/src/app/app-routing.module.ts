import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { ProfilComponent } from './components/profil/profil.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
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
import { SubcategoryComponent } from './components/subcategory/subcategory.component';
import { ProductComponent } from './components/product/product.component';
import { SearchComponent } from './components/search/search.component';
import { SalesComponent } from './components/sales/sales.component';
import { NewsComponent } from './components/news/news.component';
import { CartComponent } from './components/cart/cart.component';
import { OrderComponent } from './components/order/order.component';
import { AdminOrderDeleteComponent } from './components/admin-order-delete/admin-order-delete.component';
import { AdminOrderUpdateComponent } from './components/admin-order-update/admin-order-update.component';
import { UserOrdersComponent } from './components/user-orders/user-orders.component';
import { UserAdressComponent } from './components/user-adress/user-adress.component';
import { UserEmailComponent } from './components/user-email/user-email.component';
import { AboutComponent } from './components/about/about.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    data: {title: 'Darty'}
  },
  {
    path: "login",
    component: LoginComponent,
    data: {title: 'Se connecter'}
  },
  {
    path: "signup",
    component: SignupComponent,
    data: {title: "S'inscrire"}
  },
  {
    path: "profil",
    canActivate: [ AuthGuard ],
    component: ProfilComponent,
    data: {title: 'Profile'}
  },
  {
    path:"admin/login",
    component: AdminLoginComponent,
    data: {title: 'Admin : Se connecter'}
  },
  {
    path:"admin/signup",
    component: AdminSignupComponent,
    data: {title: "Admin : Inscrire un Admin"}
  },
  {
    path:"admin/profil",
    component: AdminProfilComponent,
    data: {title: "Admin : Profil"}
  },
  {
    path:"admin/categorie/create",
    component: AdminCategorieCreateComponent,
    data: {title: "Admin : Créer une catégorie"}
  },
  {
    path:"admin/categorie/update",
    component: AdminCategorieUpdateComponent,
    data: {title: "Admin : Mettre à jour catégorie"}
  },
  {
    path:"admin/categorie/delete",
    component: AdminCategorieDeleteComponent,
    data: {title: "Admin : Supprimez catégorie"}
  },
  {
    path:"admin/product/create",
    component: AdminProductCreateComponent,
    data: {title: "Admin : Ajouter un produit"}
  },
  {
    path:"admin/product/delete",
    component: AdminProductDeleteComponent,
    data: {title: "Admin : Supprimer un produit"}
  },
  {
    path:"admin/product/update",
    component: AdminProductUpdateComponent,
    data: {title: "Admin : Mettre à jour un produit"}
  },
  {
    path:"category/:id",
    component: CategoryComponent,
    data: {title: "Navigation Catégorie"}
  },
  {
    path:"subcategory/:id",
    component: SubcategoryComponent,
    data: {title: "Navigation Sous-Catégorie"}
  },
  {
    path:"product/:id",
    component: ProductComponent,
    data: {title: "Achat d'un produit"}
  },
  {
    path:"search/:id/:id2",
    component: SearchComponent,
    data: {title: "Recherche"}
  },
  {
    path:"search/:id",
    component: SearchComponent,
    data: {title: "Recherche"}
  },
  {
    path:"sales",
    component: SalesComponent,
    data: {title: "Produits en promotion"}
  },
  {
    path:"news",
    component: NewsComponent,
    data: {title: "Nouveaux Produits"}
  },
  {
    path:"cart",
    component: CartComponent,
    data: {title: "Panier"}
  },
  {
    path:"order",
    component: OrderComponent,
    canActivate: [ AuthGuard ],
    data: {title: "Commande"}
  },
  {
    path:"admin/order/delete",
    component: AdminOrderDeleteComponent,
    data: {title: "Admin : Supprimez Commande"}
  },
  {
    path:"admin/order/update",
    component: AdminOrderUpdateComponent,
    data: {title: "Admin : MAJ Commande"}
  },
  {
    path:"about",
    component: AboutComponent,
    data: {title: "A propos du site"}
  },
  {
    path:"profil/order",
    component: UserOrdersComponent,
    data: {title: "Mes commandes"}
  },
  {
    path:"profil/adress",
    component: UserAdressComponent,
    data: {title: "Mon adresse"}
  },
  {
    path:"profil/email",
    component: UserEmailComponent,
    data: {title: "Mon email"}
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
