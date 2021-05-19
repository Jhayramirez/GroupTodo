import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';

@Injectable({ providedIn: 'root' })
export class AppAlertService {
  internetAlert: any;
  alertLayerCount: number = 0;

  constructor(
    private toastr: ToastController,
    private loadingCtrl: LoadingController
  ) {}

  async presentToast(message, status, duration) {
    const toastr = await this.toastr.create({
      message: message,
      position: 'top',
      color: status,
      duration: duration,
    });
    toastr.present();
  }

  async initalizeAlert(message) {
    this.internetAlert = await this.loadingCtrl.create({
      cssClass: 'my-custom-class',
      message: message,
    });

    return this.internetAlert;
  }

  async presentAlert() {
    if (this.alertLayerCount == 0)
      this.alertLayerCount++ && this.internetAlert.present();
  }

  async dismissAlert() {
    this.internetAlert.dismiss();
  }
}
