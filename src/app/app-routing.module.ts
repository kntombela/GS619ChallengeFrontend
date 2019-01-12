import { UnauthorisedComponent } from './pages/unauthorised/unauthorised.component';
import { CallbackComponent } from './pages/callback/callback.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ActivityIndexComponent } from './pages/activity/activity-index/activity-index.component';
import { ActivityNewComponent } from './pages/activity/activity-new/activity-new.component';
import { ActivityEditComponent } from './pages/activity/activity-edit/activity-edit.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  // { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: '', redirectTo: 'home', pathMatch: 'prefix', canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'callback', component: CallbackComponent },
  { path: 'activity', component: ActivityIndexComponent, canActivate: [AuthGuard] },
  { path: 'activity/new', component: ActivityNewComponent, canActivate: [AuthGuard] },
  { path: 'activity/edit/:id', component: ActivityEditComponent, canActivate: [AuthGuard] },
  { path: 'unauthorised', component: UnauthorisedComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
