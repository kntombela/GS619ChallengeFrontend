import { Component, OnInit } from '@angular/core';
import { ActivityService } from '../activity/activity.service';
import { Activity } from '../activity/activity';
import { ActivityEnum } from '../activity/activity.enum';
import { Title } from '@angular/platform-browser';

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  pageTitle = 'My Activity Log';
  loading: boolean;
  activityLog: Activity[];
  activityType = ActivityEnum;
  selectedId: number;
  activityCount: number;
  totalDistance: number;
  totalDuration: number;
  fastestTime: string;
  hours: number;
  minutes: number;
  seconds: number;

  constructor(private title: Title, private activityService: ActivityService) { }

  ngOnInit() {
    this.title.setTitle(this.pageTitle);
    this._getActivityLog('google-oauth2|110766548876344057441'); //TODO: Update to get current logged in user
  }

  delete() {
    if (this.selectedId) {
      this.loading = true;
      this.activityService
        .delete(this.selectedId)
        .subscribe(_ => {
          //Refresh data after successfull delete
          this.refresh();
          this.loading = false;
        });
    }
    $('#deleteModal').modal('hide');
  }

  setSelectedRow(id) {
    this.selectedId = id;
  }

  refresh() {
    this._getActivityLog('google-oauth2|110766548876344057441'); //TODO: Update to get current logged in user
  }

  private _getActivityLog(userId) {
    this.loading = true;
    this.activityService
      .get(userId)
      .subscribe(data => {
        this.activityLog = data;
        this.activityCount = data.length;
        this.totalDistance = this._getTotalDistance(data);
        this.totalDuration = this._getTotalDuration(data);
        this._calculateDuration(this._getFastestTime(data));
        this.loading = false;
      });
  }

  private _getTotalDistance(data) {
    var total = data.reduce(function (prev, cur) {
      return prev + cur.distance;
    }, 0);
    return total;
  }

  private _getTotalDuration(data) {
    var total = data.reduce(function (prev, cur) {
      return prev + cur.duration;
    }, 0);
    return total;
  }

  private _getFastestTime(data) {
    return data.reduce((min, b) => Math.min(min, b.duration), data[0].duration);
  }

  private _calculateDuration(time) {
    this.hours = Math.floor(time);
    this.minutes = (time % 1) * 60;
    this.seconds = (this.minutes % 1) * 60;
    this.fastestTime = this.hours + ':' + this.minutes + ':' + this.seconds;
  }
}
