import { Component, OnInit, Input } from '@angular/core';
import { Activity } from '../activity';
import { ActivityEnum } from '../activity.enum';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ActivityService } from '../activity.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-activity-edit',
  templateUrl: './activity-edit.component.html',
  styleUrls: ['./activity-edit.component.scss']
})
export class ActivityEditComponent implements OnInit {

  pageTitle = 'Edit';
  @Input() activity: Activity;
  activityType = ActivityEnum;
  loading: boolean;

  constructor(
    private title: Title,
    private route: ActivatedRoute,
    private activityService: ActivityService,
    private location: Location
  ) { }

  ngOnInit() {
    this.title.setTitle('GS619 Challenge X - ' + this.pageTitle);
    this._getActivity();
  }

  private _getActivity() {
    this.loading = true;
    const id = +this.route.snapshot.paramMap.get('id');
    this.activityService
      .getActivity(id)
      .subscribe(activity => {
        this.activity = activity;
        this.loading = false;
      });
  }

  update() {
    this.activityService
      .update(this.activity)
      .subscribe(_ => this.goBack());
  }

  goBack() {
    this.location.back();
  }

}
