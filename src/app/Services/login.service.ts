import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  static exception: string;
  static prinicipal: any;
  privileges: Array<string>;
  projets: Array<string>;
  jwt: string;
  username: string;
  // tslint:disable-next-line:no-inferrable-types
  usernameupdatedmsg: string = '';

  URL = 'http://localhost:8080/login';

  constructor(private http: HttpClient) {

  }

  isAuthenticated() {
    // return this.privileges !== undefined;
    if (this.jwt !== undefined) {
      const jwthelper = new JwtHelperService();
      return !jwthelper.isTokenExpired(this.jwt);
    } else {
      return false;
    }
  }
  SetUserLogin(user: any) {
    console.log('in authSet');
    return this.http.post(this.URL, user, { observe: 'response' });
  }

  GetUserToken() {
    return this.http.get<any>(this.URL + '/token', { observe: 'response' });
  }

  SaveToken(token: string) {
    localStorage.setItem('token', token);
    this.jwt = token;
  }

  ParseJwt() {
    const jwtHelper = new JwtHelperService();
    const jwtObject = jwtHelper.decodeToken(this.jwt);
    this.username = jwtObject.sub;
    this.privileges = jwtObject.privileges;
    this.projets = jwtObject.projets;

  }

  hasAddLogToProjectPrivilege() {
    return this.privileges.indexOf('OP_AddLogToProject') >= 0;
  }

  isAdmin() {
    const jwtHelper = new JwtHelperService();

    const jwtObject = jwtHelper.decodeToken(this.jwt);

    this.privileges = jwtObject.privileges;

    return this.privileges.indexOf('ROLE_ADMIN') >= 0;
  }
  
  isUser() {
    return this.privileges.indexOf('ROLE_USER') >= 0;
  }

  loadToken() {
    if (localStorage.getItem('token') !== null) {
      console.log('in if');
      this.jwt = localStorage.getItem('token');
      this.ParseJwt();
    }
  }

  logout(usernameupdated: string) {
    if (localStorage.getItem('token') !== null) {
      localStorage.removeItem('token');
    }
    this.jwt = undefined;
    this.username = undefined;
    this.privileges = undefined;
    this.projets = undefined;
    this.usernameupdatedmsg = usernameupdated;
  }
}
