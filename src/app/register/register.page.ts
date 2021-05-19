import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AppAlertService } from '../services/app-alert.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  name: string;
  Last: string;
  fullName: string;
  email: string;
  password: string;
  phone: string;
  confirmPassword: string;
  passwordMatch: boolean;
  constructor(
    private afauth: AngularFireAuth,
    private afs: AngularFirestore,
    private loadingCtrl: LoadingController,
    private toast: AppAlertService,
    private router: Router
  ) {}

  ngOnInit() {}
  checkPassword() {
    if (this.password == this.confirmPassword) {
      this.passwordMatch = true;
    } else {
      this.passwordMatch = false;
    }
  }
  async register() {
    console.log(this.password, this.confirmPassword);
    if (this.name && this.Last && this.phone && this.password) {
      const loading = await this.loadingCtrl.create({
        message: 'loading...',
        spinner: 'crescent',
        showBackdrop: true,
      });
      loading.present();

      this.afauth
        .createUserWithEmailAndPassword(this.email, this.password)
        .then((data) => {
          data.user.sendEmailVerification();
          this.afs
            .collection('user')
            .doc(data.user.uid)
            .set({
              userId: data.user.uid,
              firstName: this.name,
              LastName: this.Last,
              fullName: this.name + ' ' + this.Last,
              userEmail: this.email,
              userPhone: this.phone,
              pwodx: this.password,
              cwodx: this.confirmPassword,
              createdAt: Date.now(),
            })
            .then(() => {
              loading.dismiss();
              this.toast.presentToast(
                'Registration Success! Your Verification Has Sent To Your Email!',
                'primary',
                3000
              );
              this.router.navigate(['/login-page']);
            })
            .catch((error) => {
              this.toast.presentToast(error.message, 'danger', 3000);
              loading.dismiss();
            });
        })
        .catch((error) => {
          loading.dismiss();
          this.toast.presentToast(error.message, 'danger', 3000);
        });
    } else {
      this.toast.presentToast('Please fill up all fields!', 'danger', 3000);
    }
  }
}
