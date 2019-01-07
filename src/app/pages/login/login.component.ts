import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  pageTitle = 'Login';

  constructor(
    private title: Title,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.title.setTitle(this.pageTitle);
    this.auth.login();
  }

}
