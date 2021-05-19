import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { ModalController } from '@ionic/angular';
import { AppAlertService } from '../services/app-alert.service';
import { CrudServiceService } from '../services/crud-service.service';
import { UserServiceService } from '../services/user-service.service';
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
  createActivity() {
    const id = this.afs.createId();

    let objSet = {
      collectionId: id,
      Title: this.title,
      Description: this.description,
      Subject: this.subject,
      DateToBeSubmitted: this.myDate,
      ActivityOwner: this.uid,
      createdId: Date.now(),
    };
    if (
      (this.title &&
        this.description &&
        this.subject &&
        this.myDate &&
        this.uid) == null
    ) {
      this.appAlert.presentToast(
        'Please fill up all the form!',
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