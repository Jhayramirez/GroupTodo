import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { EmailValidator } from '@angular/forms';
import { AppAlertService } from '../services/app-alert.service';
import { AuthService } from '../services/auth.service';
import { CrudServiceService } from '../services/crud-service.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.page.html',
  styleUrls: ['./login-page.page.scss'],
})
export class LoginPagePage implements OnInit {
  email: any;
  password: any;

  constructor(
    private auth: AuthService,
    private alert: AppAlertService,
    private crudServices: CrudServiceService,
    private afs: AngularFirestore
  ) {}

  ngOnInit() {}
  login() {
    const id = this.afs.createId();
    let Objset = {
      xuser_x: this.email,
      xpass_x: this.password,
    };
    if (this.email && this.password) {
      this.auth.signIn(this.email, this.password);
    } else {
      this.alert.presentToast(
        'Please Enter Your Email and Password',
        'warning',
        5000
      );
    }
  }
}
