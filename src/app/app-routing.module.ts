import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ActivityIndexComponent } from './pages/activity/activity-index/activity-index.component';
import { ActivityNewComponent } from './pages/activity/activity-new/activity-new.component';
import { ActivityEditComponent } from './pages/activity/activity-edit/activity-edit.component';

const routes: Routes = [
  // { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: '', redirectTo: 'home', pathMatch: 'prefix' },
  { path: 'home', component: HomeComponent },
  { path: 'activity', component: ActivityIndexComponent },
  { path: 'activity/new', component: ActivityNewComponent },
  { path: 'activity/edit/:id', component: ActivityEditComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
