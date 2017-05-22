import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as io from 'socket.io-client';

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class Chat {

  userName: string;
  socket:any
  chat_input:string;
  chats = [];

  constructor(public navCtrl: NavController, private navParams: NavParams) {
    this.userName = this.navParams.get('userName');

    this.socket = io('http://localhost:3000');

    // connect to Node server
    this.socket.on('connect', (data) => {
      this.socket.emit('join', 'Client connected.');
    });

    this.socket.on('message', (msg) => {
      this.chats.push(msg);
    });

    this.socket.on('broad', (data) => {
      this.chats.push(data);
    });
  }

  send(msg) {
    if(msg != ''){
      this.socket.emit('message', this.userName + ': ' + msg);
    }
    this.chat_input = '';
  }
}
