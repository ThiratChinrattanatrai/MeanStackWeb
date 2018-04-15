import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticateService } from '../../service/authenticate.service';
import { ValidateService } from '../../service/validate.service';
import { User } from '../../class/user';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: String;
  password: String;

  constructor(private validateService:ValidateService,
    private authService:AuthenticateService,
    private router:Router,
    private flashMessage:FlashMessagesService) { }

  ngOnInit() {
  }

  onAuthenticate(){
    console.log(this.username + " " + this.password);
    const user: User = {
      username: this.username,
      password: this.password,
      email: '',
      name: ''

    }
    let validate;
    validate = this.validateService.validateLogin(user);
    if(validate === true){
      this.authService.authenticateUser(user).subscribe(data => {
        if(data['success']){
          console.log("authenticate success" + data);
          this.flashMessage.show("success",{ cssClass: 'alert-success'});
          this.authService.storeUserData(data['token'],data['user']);
          this.router.navigate(['dashboard']);
        }else{
          this.flashMessage.show(data['message'],{ cssClass: 'alert-danger'});
          this.router.navigate(['login']);
        }
      });
    }else{
      console.log('Invalid Input');
    }
  }

}
