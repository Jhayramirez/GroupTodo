import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Route, Router } from '@angular/router';
import { Plugins } from '@capacitor/core';
import { LoadingController } from '@ionic/angular';
import { Observable, observable } from 'rxjs';
import { AppAlertService } from '../services/app-alert.service';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  userInfo: any = {
    userId: null,
    firstname: null,
    lastname: null,
    phoneNumber: null,
    fullName: null,
    userEmail: null,
  };

  constructor(
    private afs: AngularFirestore,
    private auth: AuthService,
    private fauth: AngularFireAuth,
    private loadingCtrl: LoadingController,
    private appalert: AppAlertService,
    private toast: AppAlertService,
    private router: Router
  ) {}

  async getUserInfo() {
    if (this.userInfo.userId == null)
      this.userInfo = await this.getCurrentUserInfo();

    return this.userInfo;
  }

  userInfoObservable() {
    return new Observable((observer) => {
      this.auth.user$.subscribe((user) => {
        // console.log(user, 'ako si user info');
        if (user != null) {
          this.userInfo = user;
          // this.userInfo.userId = user.userId;
          // this.userInfo.firstname = user.firstName;
          // this.userInfo.lastname = user.LastName;
          // this.userInfo.phoneNumber = user.userPhone;
          // this.userInfo.userEmail = user.userEmail;
          // this.userInfo.fullName = user.firstName + ' ' + user.LastName;

          // if (this.userInfo.userId != null) {
          observer.next(this.userInfo);
          // }
        }
      });
    });
  }

  getCurrentUserInfo() {
    return new Promise((resolve, reject) => {
      this.auth.user$.subscribe((user) => {
        // console.log(user, 'ako si user info');
        if (user != null) {
          this.userInfo = user;

          resolve(this.userInfo);
          // this.userInfo.userId = user.userId;
          // this.userInfo.firstname = user.firstName;
          // this.userInfo.lastname = user.LastName;
          // this.userInfo.phoneNumber = user.userPhone;
          // this.userInfo.userEmail = user.userEmail;
          // this.userInfo.fullName = user.firstName + ' ' + user.LastName;

          // if (this.userInfo.userId != null) {
          resolve(this.userInfo);
          // }
        }

        if (user == null) {
          reject('User has loged out');
        }
      });
    });
  }

  viewUserInfo() {
    return this.userInfo;
  }

  async storeUserInfoToStorage() {
    const { Storage } = Plugins;
    await Storage.set({
      key: 'userInfo',
      value: JSON.stringify(this.userInfo),
    });

    await Storage.set({
      key: 'user',
      value: JSON.stringify({
        id: 1,
        name: 'Max',
      }),
    });
  }

  async getStoredUserInfo() {
    const { Storage } = Plugins;
    const ret = await Storage.get({ key: 'userInfo' });
    return JSON.parse(ret.value);
  }

  // async getUserInfo(){
  //   const { Storage } = Plugins;
  //   const ret = await Storage.get({ key: 'user' });
  //   return JSON.parse(ret.value);
  // }

  getUserId() {
    return new Promise((resolve) => {
      this.getCurrentUserInfo().then((userInfo) => {
        let userInfoHolder: any = userInfo;

        // get the user id
        resolve(userInfoHolder.userId);
      });
    });
  }

  getUserIdPromise() {
    return new Promise((resolve) => {
      if (this.userInfo.userId == null) {
        this.getCurrentUserInfo().then(() => {
          resolve(this.userInfo.userId);
        });
      }

      resolve(this.userInfo.userId);
    });
  }
}
