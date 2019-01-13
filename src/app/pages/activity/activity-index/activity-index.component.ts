import { AuthService } from 'src/app/auth/auth.service';
import { UtilsService } from './../../../core/utils.service';
import { ActivityEnum } from './../activity.enum';
import { ActivityService } from './../activity.service';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Activity } from '../activity';

declare var $: any;

@Component({
  selector: 'app-activity-index',
  templateUrl: './activity-index.component.html',
  styleUrls: ['./activity-index.component.scss']
})
export class ActivityIndexComponent implements OnInit {

  pageTitle = 'My Activity Log';
  loading: boolean;
  activityLog: Activity[];
  activityType = ActivityEnum;
  selectedId: number;

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

  private _getActivityLog() {
    this.loading = true;
    this.activityService
      .get(this.auth.userProfile.sub)
      .subscribe(data => {
        this.activityLog = data;
        this.loading = false;
      });
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
}
