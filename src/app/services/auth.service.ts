import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { LoadingController, ToastController } from '@ionic/angular';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { count, switchMap } from 'rxjs/operators';
import { AppAlertService } from './app-alert.service';
import { Users } from '../models/users';

@Injectable()
export class AuthService {
  user$: Observable<Users>;
  user: Users;
  constructor(
    private afs: AngularFirestore,
    private afauth: AngularFireAuth,
    private router: Router,
    private LoadingCtrl: LoadingController,
    private toast: AppAlertService
  ) {
    this.user$ = this.afauth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.afs.doc<Users>(`user/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  } //end of constructor

  async signIn(email, password) {
    const loading = await this.LoadingCtrl.create({
      message: 'Authenticating..',
      spinner: 'crescent',
      showBackdrop: true,
    });
    loading.present();

    this.afauth
      .setPersistence(firebase.default.auth.Auth.Persistence.LOCAL)
      .then(() => {
        this.afauth
          .signInWithEmailAndPassword(email, password)
          .then((data) => {
            if (!data.user.emailVerified) {
              loading.dismiss();
              this.toast.presentToast(
                'Please verify your email address!',
                'warning',
                2000
              );
              this.afauth.signOut();
            } else {
              loading.dismiss();
              this.router.navigate(['./home']);
            }
          })
          .catch((error) => {
            loading.dismiss();
            this.toast.presentToast(error.message, 'danger', 2000);
          });
      })
      .catch((error) => {
        loading.dismiss();
        this.toast.presentToast(error.message, 'danger', 2000);
      });
  }

  async signOut() {
    const loading = await this.LoadingCtrl.create({
      message: 'Logging out.....',
      spinner: 'crescent',
      showBackdrop: true,
    });
    loading.present();

    this.afauth.signOut().then(() => {
      loading.dismiss();
      this.router.navigate(['/main-screen-login']);
    });
  }
  async changePassword(password: string) {
    const loading = await this.LoadingCtrl.create({
      message: 'Updating Password...',
      spinner: 'crescent',
      showBackdrop: true,
    });
    loading.present();
    (await this.afauth.currentUser)
      .updatePassword(password)
      .then(() => {
        loading.dismiss();
        this.toast
          .presentToast('Password Successfuly updated!', 'success', 3000)
          .then(() => {
            this.signOut();
          });
      })
      .catch((error) => {
        loading.dismiss();
        this.toast.presentToast(error.message, 'danger', 2000);
      });
  }
  async resetPassword(email: any) {
    if (email) {
      const loading = await this.LoadingCtrl.create({
        message: 'Sending Reset password link..',
        spinner: 'crescent',
        showBackdrop: true,
      });
      loading.present();
      this.afauth
        .sendPasswordResetEmail(email)
        .then(() => {
          loading.dismiss();
          this.toast.presentToast('Reset Password Link Sent!', 'success', 2500);
          this.router.navigate(['/login-page']);
        })
        .catch((error) => {
          loading.dismiss();
          this.toast.presentToast(error.message, 'danger', 2500);
        });
    } else {
      this.toast.presentToast(
        'Please Enter Your Email Address!',
        'warning',
        2500
      );
    }
  }
}
