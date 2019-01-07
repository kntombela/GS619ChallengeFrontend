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
  hours: number;
  minutes: number;
  seconds: number;

  constructor(
    private title: Title,
    private activityService: ActivityService,
    private location: Location
  ) { }

  ngOnInit() {
    this.title.setTitle(this.pageTitle);
  }

  add(activity: Activity) {
    activity.duration = this._calculateTime();
    activity.userId = 'google-oauth2|110766548876344057441'; //TODO: Update to get current logged in user
    this.activityService
      .add(activity)
      .subscribe(() => this.goBack());
  }

  private _calculateTime() {
    return +((this.hours + (this.minutes / 60) + (this.seconds / 3600)).toFixed(2)); 
  }

  goBack() {
    this.location.back();
  }
}
