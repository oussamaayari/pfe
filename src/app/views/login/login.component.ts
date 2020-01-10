import { LoginService } from '../../Services/login.service';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
const usernotfound = 'usernotfound';
const badcredentials = 'badcredentials';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html',
  styleUrls: ['./login.compenent.css']
})
export class LoginComponent {
  exception: string;
  usernameupdatedmsg: string;

  authform: FormGroup = new FormGroup({
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required)
  });

  constructor(private loginService: LoginService, private route: Router) {
    // this.exception = loginService.exception;
    // this.usernameupdatedmsg = this.loginService.usernameupdatedmsg;
    console.log('in loin component');
  }


  login() {
    console.log('login button works');
    if (this.authform.valid) {
      console.log('valid form');
      this.loginService.SetUserLogin(this.authform.value).subscribe(response => {
        console.log('in response');
        let jwttoken = response.headers.get('Authorization');
        console.log(response.headers);
        console.log(response.body);
        console.log(jwttoken);
        this.loginService.SaveToken(jwttoken);
        this.loginService.ParseJwt();
        this.route.navigate(['/']);
        console.log(this.loginService.isAuthenticated());
      }, error => {
        // const exception = error.headers.get('Exception');
        // LoginService.exception = exception;
        // if (exception === usernotfound) {
        this.route.navigate(['/badcredentials']);
        this.exception = 'Bad Credentials';
        console.log(this.exception);
        //  } else
        //  if (exception === badcredentials) {
        // this.route.navigate(['/badcredentials']);
        // this.exception = exception;
        // }
        console.log('in error');
        console.log(error.status);
        console.log(error.headers);
        console.log(error.body);
        // console.log(exception);
      });
    } else {
      this.exception = 'Veuillez remplir les champs convenablement';
    }
  }

  Onmousedown() {
    console.log('mousedown');
    if (this.exception !== '') {
      this.exception = '';
    }
  }
}
