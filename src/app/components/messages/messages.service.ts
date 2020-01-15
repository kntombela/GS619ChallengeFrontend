import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  messages: string[] = [];
  isSuccess: boolean;
  profileUpdate: boolean = false;
  userName: string;

  add(message: string, isSuccess: boolean) {
    this.messages.push(message);
    this.isSuccess = isSuccess;
    this.timeout();
  }

  clear() {
    this.messages = [];
    this.profileUpdate = false;
    this.userName = '';
  }

  setProfileReminder(userName) {
    this.profileUpdate = true;
    this.userName = userName;
  }

  timeout() {
    var that = this;
    setTimeout(function () {
      that.clear();
    }, 3000);
  }

}
