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

  constructor(private title: Title, private activityService: ActivityService) { }

  ngOnInit() {
    this.title.setTitle(this.pageTitle);
    this._getActivityLog('google-oauth2|110766548876344057441'); //TODO: Update to get current logged in user
  }

  private _getActivityLog(userId) {
    this.loading = true;
    this.activityService
      .get(userId)
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
    this._getActivityLog('google-oauth2|110766548876344057441'); //TODO: Update to get current logged in user
  }
}
