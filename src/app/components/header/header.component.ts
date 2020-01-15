import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { AUTH_CONFIG } from 'src/app/auth/auth.config';
import { MessagesService } from '../messages/messages.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  profile: any;

  constructor(public auth: AuthService) { }

  ngOnInit() {

  }

}
