import { AppUser } from './../../Model/AppUser';
import { AppUserService } from '../../Services/app-user.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-app-user',
  templateUrl: './app-user.component.html',
  styleUrls: ['./app-user.component.scss']
})
export class AppUserComponent implements OnInit {


  appuserform: FormGroup = new FormGroup({
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
    activated: new FormControl(null, Validators.required),
  });

  constructor(private appUserService: AppUserService) { }

  ngOnInit() {
  }

  add() {

    console.log(this.appuserform.value);
    const appuser: AppUser = new AppUser();
    appuser.username = this.appuserform.get(['username']).value;
    appuser.password = this.appuserform.get(['password']).value;
    appuser.activated = this.appuserform.get(['activated']).value;
    console.log(appuser);
    this.appUserService.add(appuser).subscribe(data => {
      console.log(data.body);
    });


  }
}
