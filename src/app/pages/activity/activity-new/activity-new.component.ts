import { AuthService } from './../../../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Activity } from '../activity';
import { ActivityEnum } from '../activity.enum';
import { Title } from '@angular/platform-browser';
import { ActivityService } from '../activity.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-activity-new',
  templateUrl: './activity-new.component.html',
  styleUrls: ['./activity-new.component.scss']
})
export class ActivityNewComponent implements OnInit {

  pageTitle = 'New';
  activity = new Activity();
  activityType = ActivityEnum;

  constructor(
    private title: Title,
    private activityService: ActivityService,
    private location: Location,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.title.setTitle('GS619 Challenge X - ' + this.pageTitle);
  }

  add(activity: Activity) {
    if (this.auth.userProfile) {
      activity.userId = this.auth.userProfile.sub;
      this.activityService
        .add(activity)
        .subscribe(() => this.goBack());
    }
  }

  goBack() {
    this.location.back();
  }
}
