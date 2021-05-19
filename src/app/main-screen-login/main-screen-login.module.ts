import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MainScreenLoginPageRoutingModule } from './main-screen-login-routing.module';

import { MainScreenLoginPage } from './main-screen-login.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MainScreenLoginPageRoutingModule
  ],
  declarations: [MainScreenLoginPage]
})
export class MainScreenLoginPageModule {}
