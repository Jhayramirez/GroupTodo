import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ModalController } from '@ionic/angular';
import { ActivityService } from '../services/activity.service';

@Component({
  selector: 'app-view-activity',
  templateUrl: './view-activity.page.html',
  styleUrls: ['./view-activity.page.scss'],
})
export class ViewActivityPage implements OnInit {
  activityArray: any;
  collectionId: any;
  constructor(
    private afs: AngularFirestore,
    private activity: ActivityService,
    private modalController: ModalController
  ) {}

  ngOnInit() {}
  async ionViewWillEnter() {
    this.collectionId = this.activity.ActivityCollectionId;
    await this.ownActivityView();
  }
  testing() {
    alert('asdasd');
  }

  async ownActivityView() {
    this.afs
      .collection('Activity_collections', (ref) =>
        ref.where('collectionId', '==', this.collectionId)
      )
      .valueChanges()
      .subscribe((Activity) => {
        this.activityArray = Activity;
        console.log(this.activityArray);
      });
  }
  closeModal() {
    this.modalController.dismiss();
  }
}
