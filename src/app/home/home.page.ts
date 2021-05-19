import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { CreateActivityPage } from '../create-activity/create-activity.page';
import { ViewActivityPage } from '../view-activity/view-activity.page';
import { UserServiceService } from '../services/user-service.service';
import { ActivityService } from '../services/activity.service';
import { Router, Routes } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  title: any;
  description: any;
  subject: any;
  myDate: any;
  uid: any;
  activityArray: any = [];
  constructor(
    private userService: UserServiceService,
    private modalController: ModalController,
    private afs: AngularFirestore,
    private activity: ActivityService,
    private router: Router
  ) {}
  ngOnInit() {}

  async ionViewWillEnter() {
    this.fetchYourOwnCreatedActivity();
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

  fetchYourOwnCreatedActivity() {
    this.userService.getUserId().then((userId) => {
      this.afs
        .collection('Activity_collections', (ref) =>
          ref.where('ActivityOwner', '==', userId)
        )
        .valueChanges()
        .subscribe((Activity) => {
          this.activityArray = Activity;
          console.log(this.activityArray);
        });
    });
  }

  async getActivityIdCollection(collectionId) {
    this.activity.setActivityId(collectionId);
    this.router.navigate(['/view-activity']);
  }
}
