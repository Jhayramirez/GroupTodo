import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
    canActivate: [AuthGuard],
  },
  {
    path: '',
    redirectTo: 'main-screen-login',
    pathMatch: 'full',
  },
  {
    path: 'main-screen-login',
    loadChildren: () =>
      import('./main-screen-login/main-screen-login.module').then(
        (m) => m.MainScreenLoginPageModule
      ),
  },
  {
    path: 'login-page',
    loadChildren: () =>
      import('./login-page/login-page.module').then(
        (m) => m.LoginPagePageModule
      ),
  },
  {
    path: 'forgot-password',
    loadChildren: () =>
      import('./forgot-password/forgot-password.module').then(
        (m) => m.ForgotPasswordPageModule
      ),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./register/register.module').then((m) => m.RegisterPageModule),
  },
  {
    path: 'create-activity',
    loadChildren: () =>
      import('./create-activity/create-activity.module').then(
        (m) => m.CreateActivityPageModule
      ),
  },
  {
    path: 'view-activity',
    loadChildren: () =>
      import('./view-activity/view-activity.module').then(
        (m) => m.ViewActivityPageModule
      ),
  },
  {
    path: 'change-password',
    loadChildren: () => import('./change-password/change-password.module').then( m => m.ChangePasswordPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
