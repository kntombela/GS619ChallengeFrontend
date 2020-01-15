import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { MessagesService } from './components/messages/messages.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Good Stories 619 Challenge VI';

  constructor(private auth: AuthService) {
    
  }

 

}
