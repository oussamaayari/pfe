import { LoginService } from './login.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reponse } from '../Model/Reponse';

@Injectable({
  providedIn: 'root'
})
export class ReponseService {


  private URL = 'http://localhost:8080/reponse';
  constructor(private httpClient: HttpClient, private loginService: LoginService) {
  }
  add(reponse: Reponse) {
    const header = new HttpHeaders({ 'Authorization': this.loginService.jwt });
    return this.httpClient.post(this.URL + '/add', reponse, { observe: 'response', headers: header });
  }

  findall() {
    const header = new HttpHeaders({ 'Authorization': this.loginService.jwt });
    return this.httpClient.get<Array<any>>(this.URL + '/findAll' , { observe: 'response', headers: header });
  }

  update(reponse: Reponse) {
    const header = new HttpHeaders({ 'Authorization': this.loginService.jwt });
    return this.httpClient.put(this.URL + '/update', reponse, { observe: 'response', headers: header });
  }

}
