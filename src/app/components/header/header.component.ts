import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { AUTH_CONFIG } from 'src/app/auth/auth.config';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  profile: any;

  constructor(public auth: AuthService) { }

  ngOnInit() {
    // if (this.auth.userProfile) {
    //   this.profile = this.auth.userProfile;
    //   console.log(JSON.stringify(this.profile));
    // } else {
    //   this.auth.getProfile((err, profile) => {
    //     this.profile = profile;
    //     console.log(JSON.stringify(this.profile));
    //   });
    // }
    this.auth.renewToken();
  }

}
