import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { ModalController } from '@ionic/angular';
import { AppAlertService } from '../services/app-alert.service';
import { CrudServiceService } from '../services/crud-service.service';
import { UserServiceService } from '../services/user-service.service';
import * as moment from 'moment';
@Component({
  selector: 'app-create-activity',
  templateUrl: './create-activity.page.html',
  styleUrls: ['./create-activity.page.scss'],
})
export class CreateActivityPage implements OnInit {
  title: any;
  description: any;
  subject: any;
  myDate: String = new Date().toISOString();
  uid: any;
  testtest:any = ['asd' , 'asd' ,'asd'];

  constructor(
    private modalController: ModalController,
    private crudService: CrudServiceService,
    private afs: AngularFirestore,
    private afauth: AngularFireAuth,
    private userService: UserServiceService,
    private appAlert: AppAlertService
  ) {}

  async ngOnInit() {
    await this.getCurrentUserId();
  }
  closeModal() {
    this.modalController.dismiss();
  }
  getCurrentUserId() {
    this.userService.getUserId().then((userId) => {
      this.uid = userId;
    });
  }
  generateActivityUID(len) {
    let arr = '1A2a3B4b5C6c7D8d9E0eFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz';

    var ans = '';
    for (var i = len; i > 0; i--) {
      ans += arr[Math.floor(Math.random() * arr.length)];
    }
    return ans;
  }

  createActivity() {
    const id = this.afs.createId();

    let objSet = {
      collectionId: id,
      Title: this.title,
      Description: this.description,
      Subject: this.subject,
      DateToBeSubmitted: (this.myDate = moment().format(
        'MMMM Do YYYY, h:mm:ss a'
      )),
      ActivityUID: this.generateActivityUID(6),
      ActivityOwner: this.uid,
      createdAt: Date.now(),
      testing : this.testtest,
    };
    if (
      (this.title &&
        this.description &&
        this.subject &&
        this.myDate &&
        this.uid) == null
    ) {
      this.appAlert.presentToast(
        'Please fill up all the form.',
        'warning',
        3000
      );
      return;
    }
    this.crudService.create(id, 'Activity_collections', objSet).then(() => {
      this.modalController.dismiss();
    });
  }
}
