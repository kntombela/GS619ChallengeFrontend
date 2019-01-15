import { AuthService } from 'src/app/auth/auth.service';
import { UtilsService } from './../../core/utils.service';
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

  pageTitle = 'Dashboard';
  loading: boolean;
  activityLog: Activity[];
  activityType = ActivityEnum;
  selectedId: number;
  activityCount: number;
  totalDistance: number;
  totalDuration = new Date();
  fastestTime: string;

  constructor(
    private title: Title,
    private activityService: ActivityService,
    public utils: UtilsService,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.title.setTitle('GS619 Challenge X - ' + this.pageTitle);
    this._getActivityLog();
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
    this._getActivityLog();
  }

  getDuration(hours, minutes, seconds) {
    return ("0" + hours).slice(-2) + ":" + ("0" + minutes).slice(-2) + ":" + ("0" + seconds).slice(-2);
  }

  private _getActivityLog() {
    this.loading = true;
    this.activityService
      .getTop7(this.auth.userProfile.sub)
      .subscribe(data => {
        this.activityLog = data;
        this.activityCount = data.length;
        this.totalDistance = this._getTotalDistance(data);
        // this.totalDuration = this._getTotalDuration(data);
        // this._calculateDuration(data);
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

  private _calculateDuration(data) {

    data.forEach(element => {
      var d = new Date();
      d.setHours(element.hours, element.minutes, element.seconds);
      console.log(d.getTime());
    });
  }
}
