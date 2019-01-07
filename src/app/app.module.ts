import { ActivityService } from './pages/activity/activity.service';
import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { ActivityIndexComponent } from './pages/activity/activity-index/activity-index.component';
import { ActivityNewComponent } from './pages/activity/activity-new/activity-new.component';
import { ActivityEditComponent } from './pages/activity/activity-edit/activity-edit.component';
import { HeaderComponent } from './components/header/header.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { MessagesComponent } from './components/messages/messages.component';
import { EnumPipe } from './shared/pipes/enum.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ActivityIndexComponent,
    ActivityNewComponent,
    ActivityEditComponent,
    HeaderComponent,
    SidenavComponent,
    MessagesComponent,
    EnumPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    ActivityService,
    Title
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
