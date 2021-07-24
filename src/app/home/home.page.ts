import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {
  ActionSheetController,
  LoadingController,
  ModalController,
} from '@ionic/angular';
import { CreateActivityPage } from '../create-activity/create-activity.page';
import { ViewActivityPage } from '../view-activity/view-activity.page';
import { UserServiceService } from '../services/user-service.service';
import { ActivityService } from '../services/activity.service';
import { Router, Routes } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AppAlertService } from '../services/app-alert.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  selectedSegmentValue: any = 'currentProject';
  title: any;
  description: any;
  subject: any;
  myDate: any;
  uid: any;
  activityArray: any = [];
  cavity:any;

  testin: any = [];
  constructor(
    private userService: UserServiceService,
    private modalController: ModalController,
    private afs: AngularFirestore,
    private activity: ActivityService,
    private router: Router,
    private loadingController: LoadingController,
    private appAlert: AppAlertService
  ) {}
  ngOnInit() {}

  async ionViewWillEnter() {
    this.fetchYourOwnCreatedActivity();
    this.getTeamingprojects();
  }
  segmentChanged(ev: any) {
    // console.log(ev.target.value);
    if (ev.target.value == 'currentProject') {
      this.selectedSegmentValue = ev.target.value;
      console.log(this.selectedSegmentValue);
      return;
    }
    if (ev.target.value == 'otherProject') {
      this.selectedSegmentValue = ev.target.value;
      console.log(this.selectedSegmentValue);
      return;
    }
    if (ev.target.value == 'requestConfirmation') {
      this.selectedSegmentValue = ev.target.value;
      console.log(this.selectedSegmentValue);
      return;
    }
  }
  // testingPushArray() {
  //   console.log(this.testin);
  //   this.testin.push('jhay', 'jhay', 'jhay');
  // }
  async fetchYourOwnCreatedActivity() {
    const loading = await this.loadingController.create({
      message: 'fetching projects ...',
      spinner: 'crescent',
      showBackdrop: true,
    });
    loading.present();
    this.userService
      .getUserId()
      .then((userId) => {
        this.afs
          .collection('Activity_collections', (ref) =>
            ref.where('ActivityOwner', '==', userId)
          )
          .valueChanges()
          .subscribe((Activity) => {
            loading.dismiss();
            this.activityArray = Activity;
            console.log(this.activityArray);
          });
      })
      .catch((error) => {
        loading.dismiss();
        this.appAlert.presentToast(error.message, 'danger', 2000);
      });
  }

  async getTeamingprojects() {
    const loading = await this.loadingController.create({
      message: 'fetching projects ...',
      spinner: 'crescent',
      showBackdrop: true,
    });
    loading.present();
    this.userService
      .getUserId()
      .then((userId) => {
        this.afs
          .collection('Activity_collections', (ref) =>
            ref.where('testing', '!=', null)
          )
          .valueChanges()
          .subscribe((Activity) => {
            loading.dismiss();
            this.cavity = Activity;
            console.log(this.cavity);
          });
      })
      .catch((error) => {
        loading.dismiss();
        this.appAlert.presentToast(error.message, 'danger', 2000);
      });
  }

  async getActivityIdCollection(collectionId) {
    this.activity.setActivityId(collectionId);
    this.router.navigate(['/view-activity']);
  }
}
