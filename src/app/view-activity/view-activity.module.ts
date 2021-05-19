import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewActivityPageRoutingModule } from './view-activity-routing.module';

import { ViewActivityPage } from './view-activity.page';
// shared fvcking components
import { HeaderModule } from '../includes/header.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewActivityPageRoutingModule,
    HeaderModule,
  ],
  declarations: [ViewActivityPage],
})
export class ViewActivityPageModule {}
