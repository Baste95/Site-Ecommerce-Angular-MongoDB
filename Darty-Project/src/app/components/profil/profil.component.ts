import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  constructor(private user: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  logout() {
    localStorage.removeItem('Token');
    this.router.navigate([ '/' ]);
  } 

}
