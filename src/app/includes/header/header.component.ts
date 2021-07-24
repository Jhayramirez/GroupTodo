import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { UserServiceService } from 'src/app/services/user-service.service';
import { CreateActivityPage } from '../../create-activity/create-activity.page';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  fullName: any;
  userInfo: any;
  constructor(
    private userService: UserServiceService,
    public actionSheetController: ActionSheetController,
    public AuthService: AuthService,
    private router: Router,
    private modalController: ModalController
  ) {}

  async ngOnInit() {
    this.userInfo = await this.userService.getCurrentUserInfo();
    await this.initializeUserInfoUi();
    console.log(this.userInfo);
  }

  async launchCreateActivityModal() {
    const modal = await this.modalController.create({
      component: CreateActivityPage,
      cssClass: 'my-custom-class',
    });

    return await modal.present();
  }
  closeModal() {
    this.modalController.dismiss();
  }
  capitalizeString(string) {
    let stringHolderArray = string.split('');

    stringHolderArray[0] = stringHolderArray[0].toUpperCase();

    let convertedString = stringHolderArray.join('');

    return convertedString;
  }

  initializeUserInfoUi() {
    return new Promise((resolve) => {
      let userInfo: any = this.userInfo;

      let firstname = this.capitalizeString(userInfo.firstName);
      let lastname = this.capitalizeString(userInfo.LastName);

      let fullName = `${firstname} ${lastname}`;

      this.fullName = fullName;

      resolve('ok');
    });
  }
  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: this.fullName,
      cssClass: 'my-custom-class',
      buttons: [
        {
          text: 'Change Password',
          icon: 'person-circle-outline',
          handler: () => {
            this.router.navigate(['/change-password']);
          },
        },
        {
          text: 'Sign out',
          role: 'destructive',
          icon: 'log-out-outline',
          handler: () => {
            this.AuthService.signOut();
          },
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            this.actionSheetController.dismiss();
          },
        },
      ],
    });
    await actionSheet.present();
  }
}
