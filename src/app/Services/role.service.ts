import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginService } from './login.service';
import { AppRole } from '../Model/AppRole';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

private URL = 'http://localhost:8080/AppRole';
  constructor(private httpClient: HttpClient, private loginService: LoginService) {
  }
  add(role: AppRole) {
    const header = new HttpHeaders({ 'Authorization': this.loginService.jwt });
    return this.httpClient.post(this.URL + '/add', role, { observe: 'response', headers: header });
  }

  findall() :any {
    const header = new HttpHeaders({ 'Authorization': this.loginService.jwt });
    return this.httpClient.get<Array<any>>(this.URL + '/findAll' , { observe: 'response', headers: header });
  }

}
