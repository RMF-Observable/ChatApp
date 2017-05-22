import {Component} from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import {LoginService} from '../../providers/login.service';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login {

  userName: string;
  errMsg: string;

  constructor(private login: LoginService, private navCtrl: NavController) {}

  validateLoginData(): void {
    if (this.userName == undefined) {
      this.errMsg = 'Please enter UserName and Password.';
    } else {
      let data = {user_name: this.userName};

      this.login.login(data).subscribe(resp => {
        //console.log(resp);
        if (resp['success'] == false) {
          this.errMsg = resp['msg'];
        } else {
            this.errMsg = '';
            this.navCtrl.push('Chat', {userName : this.userName});
          }
       })
    }
  }
}
