import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-screen-login',
  templateUrl: './main-screen-login.page.html',
  styleUrls: ['./main-screen-login.page.scss'],
})
export class MainScreenLoginPage implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  loginPage() {
    this.router.navigate(['/login-page']);
  }
}
