import { Entretien } from './../Model/Entretien';
import { LoginService } from './login.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Injectable } from '@angular/core';
import { Question } from '../Model/Question';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {


  private URL = 'http://localhost:8080/question';
  constructor(private httpClient: HttpClient, private loginService: LoginService) {
  }
  add(question: Question) {
    const header = new HttpHeaders({ 'Authorization': this.loginService.jwt });
    return this.httpClient.post(this.URL + '/add', question, { observe: 'response', headers: header });
  }

  findall() {
    const header = new HttpHeaders({ 'Authorization': this.loginService.jwt });
    return this.httpClient.get<Array<any>>(this.URL + '/findAll' , { observe: 'response', headers: header });
  }

  update(question: Question) {
    const header = new HttpHeaders({ 'Authorization': this.loginService.jwt });
    return this.httpClient.put(this.URL + '/update', question, { observe: 'response', headers: header });
  }

}
