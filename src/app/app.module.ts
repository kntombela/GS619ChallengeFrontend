import { AuthService } from 'src/app/auth/auth.service';
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
import { CallbackComponent } from './pages/callback/callback.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './guard/auth.guard';
import { LoadingComponent } from './core/loading.component';
import { UtilsService } from './core/utils.service';
import { UnauthorisedComponent } from './pages/unauthorised/unauthorised.component';

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
    EnumPipe,
    CallbackComponent,
    LoginComponent,
    LoadingComponent,
    UnauthorisedComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    ActivityService,
    UtilsService,
    AuthService,
    AuthGuard,
    Title
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
