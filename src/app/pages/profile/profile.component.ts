/// <reference types="@types/googlemaps" />
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'src/app/auth/auth.service';
import { ProfileService } from './profile.service';
import { AUTH_CONFIG } from 'src/app/auth/auth.config';
import { MapsAPILoader } from '@agm/core';
import { ViewChild, ElementRef, NgZone } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  pageTitle = 'User Profile';
  user_metadata: any;
  gender = ["Male", "Female"];
  @ViewChild('search') public searchElement: ElementRef;

  constructor(
    private title: Title,
    public auth: AuthService,
    private profileService: ProfileService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) { }

  ngOnInit() {
    this.title.setTitle('GS619 Challenge X - ' + this.pageTitle);
    this._getProfile();
    this._getManagementAccess();
    //Google Location API Init
    this.mapsAPILoader.load().then(
      () => {
        let autocomplete = new google.maps.places.Autocomplete(this.searchElement.nativeElement, { types: ["address"] });

        autocomplete.addListener("place_changed", () => {
          this.ngZone.run(() => {
            let place: google.maps.places.PlaceResult = autocomplete.getPlace();
            if (place.geometry === undefined || place.geometry === null) {
              return;
            }
            this.user_metadata.location = place.formatted_address;
            console.log(JSON.stringify(this.user_metadata.location));
          });
        });
      }
    );
  }

  update() {
    if (this.profileService.managementAccessToken) {
      this.profileService.update(this.auth.userProfile.sub, this.user_metadata)
        .subscribe();
    } else {
      this._getManagementAccess();
    }
  }

  private _getProfile() {
    if (this.auth.userProfile) {
      this.user_metadata = this.auth.userProfile[AUTH_CONFIG.PROFILE_NAMESPACE] || {};
    } else {
      this.auth.renewToken();
      this.user_metadata = this.auth.userProfile[AUTH_CONFIG.PROFILE_NAMESPACE] || {};
    }
  }

  private _getManagementAccess() {
    this.profileService.getManagementAccessToken().subscribe(
      data => { this.profileService.managementAccessToken = data['access_token'] }
    );
  }
}
