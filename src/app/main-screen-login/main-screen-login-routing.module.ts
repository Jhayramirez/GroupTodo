import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainScreenLoginPage } from './main-screen-login.page';

const routes: Routes = [
  {
    path: '',
    component: MainScreenLoginPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainScreenLoginPageRoutingModule {}
