import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { LoadingController, ModalController } from '@ionic/angular';
import { ActivityService } from '../services/activity.service';
import { AddTaskPage } from '../add-task/add-task.page';

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
    private modalController: ModalController,
    private router: Router,
    private loadingController: LoadingController
  ) {}

  ngOnInit() {}
  async ionViewWillEnter() {
    this.collectionId = this.activity.ActivityCollectionId;
    if (this.collectionId == null) {
      this.router.navigate(['/home']);
      return;
    }
    await this.ownActivityView();
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
  async launchAddTaskModal() {
    const modal = await this.modalController.create({
      component: AddTaskPage,
      cssClass: 'my-custom-class',
    });

    return await modal.present();
  }
}
