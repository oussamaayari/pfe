import { Entretien } from './../Model/Entretien';
import { LoginService } from './login.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EntretienService {


  private URL = 'http://localhost:8080/entretien';
  constructor(private httpClient: HttpClient, private loginService: LoginService) {
  }
  add(entretien: Entretien) {
    const header = new HttpHeaders({ 'Authorization': this.loginService.jwt });
    return this.httpClient.post(this.URL + '/add', entretien, { observe: 'response', headers: header });
  }

  findall() {
    const header = new HttpHeaders({ 'Authorization': this.loginService.jwt });
    return this.httpClient.get<Array<any>>(this.URL + '/findAll' , { observe: 'response', headers: header });
  }
  search(name:any) {
    const header = new HttpHeaders({ 'Authorization': this.loginService.jwt });
    return this.httpClient.get<Array<any>>(this.URL + '/search/'+name, { observe: 'response', headers: header });
  }
  update(entretien: Entretien) {
    const header = new HttpHeaders({ 'Authorization': this.loginService.jwt });
    return this.httpClient.put(this.URL + '/update', entretien, { observe: 'response', headers: header });
  }
  deleteEntretien(id: number){
    const header = new HttpHeaders({ 'Authorization': this.loginService.jwt });
    return this.httpClient.delete(this.URL + '/delete/'+ id, { observe: 'response', headers: header });
                          
  }
}
