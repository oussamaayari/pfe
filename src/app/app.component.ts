import { LoginService } from './Services/login.service';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  // tslint:disable-next-line
  selector: 'body',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit {
  constructor(private router: Router, private loginService: LoginService) {
    this.loginService.loadToken();
    console.log(this.loginService.isAuthenticated());
    if (this.loginService.isAuthenticated()) {
      console.log('is auth');
      this.router.navigateByUrl('/');

    } else { this.router.navigateByUrl('/login'); }




  }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }
}
