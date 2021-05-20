import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.page.html',
  styleUrls: ['./add-task.page.scss'],
})
export class AddTaskPage implements OnInit {
  constructor(private modalController: ModalController) {}

  ngOnInit() {}
  closeModal() {
    this.modalController.dismiss();
  }
}
