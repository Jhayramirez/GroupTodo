import { Component, OnInit } from '@angular/core';
import { AppAlertService } from '../services/app-alert.service';
import { AuthService } from '../services/auth.service';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage {
  old_password: string;
  new_password: string;
  confirm_password: string;
  userInfo: any;

  constructor(
    private userService: UserServiceService,
    private appAlert: AppAlertService,
    private authService: AuthService
  ) {}

  async ionViewWillEnter() {
    this.userInfo = await this.userService.getCurrentUserInfo();
    await this.initializeUserInfoUi();
  }

  initializeUserInfoUi() {
    return new Promise((resolve) => {
      let userInfo: any = this.userInfo;
      resolve('ok');
    });
  }
  async changePassword() {
    await this.userService.getCurrentUserInfo().then((userInfo) => {
      this.userInfo = userInfo;
      if (
        (this.old_password && this.new_password && this.confirm_password) ==
        null
      ) {
        this.appAlert.presentToast('Fill up all the forms!', 'danger', 3000);
        return;
      }
      if (this.old_password != this.userInfo.pwodx) {
        console.log(this.userInfo.pwodx);
        this.appAlert.presentToast('Wrong old password!', 'danger', 3000);
        return;
      }
      if (
        this.old_password == this.userInfo.pwodx &&
        this.new_password != this.confirm_password
      ) {
        this.appAlert.presentToast(
          'New password doenst match!',
          'danger',
          2000
        );
      }
      if (
        this.old_password == this.userInfo.pwodx &&
        this.new_password == this.confirm_password
      ) {
        console.log(this.userInfo.pwodx);
        this.authService.changePassword(this.confirm_password);
      }
    });
  }
}
