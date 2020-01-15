import { AuthService } from 'src/app/auth/auth.service';
import { UtilsService } from './../../core/utils.service';
import { Component, OnInit } from '@angular/core';
import { ActivityService } from '../activity/activity.service';
import { Activity } from '../activity/activity';
import { ActivityEnum } from '../activity/activity.enum';
import { Title } from '@angular/platform-browser';
import { MessagesService } from 'src/app/components/messages/messages.service';
import { AUTH_CONFIG } from 'src/app/auth/auth.config';

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  pageTitle = 'Dashboard';
  loading: boolean;
  top7Activities: Activity[];
  activityType = ActivityEnum;
  selectedId: number;
  activitySummary: number;
  totalDistance: number;
  totalDuration = new Date();
  fastestTime: string;

  constructor(
    private title: Title,
    private activityService: ActivityService,
    public utils: UtilsService,
    private auth: AuthService,
    private _messagesServices: MessagesService
  ) { }

  ngOnInit() {
    this.title.setTitle('GS619 Challenge X - ' + this.pageTitle);
    this._getTop7Activities();
    this._getActivitySummary();
    this._setProfileReminder();
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
    this._getTop7Activities();
    this._getActivitySummary();
    this._setProfileReminder();
  }

  getDuration(hours, minutes, seconds) {
    return ("0" + hours).slice(-2) + ":" + ("0" + minutes).slice(-2) + ":" + ("0" + seconds).slice(-2);
  }

  private _getActivitySummary() {
    this.loading = true;
    this.activityService
      .get(this.auth.userProfile.sub)
      .subscribe(data => {
        this.activitySummary = data.length;
        this.totalDistance = this._getTotalDistance(data);
        // this.totalDuration = this._getTotalDuration(data);
        // this._calculateDuration(data);
        this.loading = false;
      });
  }

  private _getTop7Activities() {
    this.loading = true;
    this.activityService
      .getTop7(this.auth.userProfile.sub)
      .subscribe(data => {
        this.top7Activities = data;
        // this.totalDuration = this._getTotalDuration(data);
        // this._calculateDuration(data);
        this.loading = false;
      });
  }

  private _getTotalDistance(data) {
    var total = data.reduce(function (prev, cur) {
      return prev + cur.distance;
    }, 0);
    // return +(total.toFixed());
    return Math.round(total * 100) / 100
  }

  private _setProfileReminder() {
    var userMetaData = this.auth.userProfile[AUTH_CONFIG.PROFILE_NAMESPACE] || {};
    //Check if user has meta data
    if (this.isEmptyObject(userMetaData)) {
      //Set profile completion reminder
      this._messagesServices.setProfileReminder(this.auth.userProfile.given_name);
    } else {
      //Check profile completion
      if (!userMetaData.age && !userMetaData.location) {
        //Set profile completion reminder with right name
        if (this.auth.userProfile.given_name) {
          this._messagesServices.setProfileReminder(this.auth.userProfile.given_name);
        }
        if (!this.auth.userProfile.given_name && this.auth.alternateUsername) {
          this._messagesServices.setProfileReminder(this.auth.alternateUsername);
        }
      }
    }
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

  isEmptyObject(obj) {
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        return false;
      }
    }
    return true;
  }
}
