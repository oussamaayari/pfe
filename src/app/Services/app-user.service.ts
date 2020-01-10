import { AppRole } from './../Model/AppRole';
import { AppUser } from './../Model/AppUser';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { LoginService } from './login.service';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import "rxjs/add/operator/map"

@Injectable({
  providedIn: 'root'
})
export class AppUserService {


  private URL = 'http://localhost:8080/AppUser';
  constructor(private httpClient: HttpClient, private loginService: LoginService) {
  }
  add(appuser: AppUser) {
    const header = new HttpHeaders({ 'Authorization': this.loginService.jwt });
    return this.httpClient.post(this.URL + '/add', appuser, { observe: 'response', headers: header }).pipe(catchError(this.errorHandler));
                       
  }
  errorHandler(error:HttpErrorResponse){
    if (error.status==500)
     
    {return throwError( "user already exists ");}
    else
    
    {return throwError (error.message|| "server not connected");}
   
  }
  
  findall():Observable<any> {
    const header = new HttpHeaders({ 'Authorization': this.loginService.jwt });
    return this.httpClient.get<any>(this.URL + '/findAll' , { observe: 'response', headers: header });
;
  }
       
  addRoletoUser(appuser:AppUser,approle:AppRole){
  const header = new HttpHeaders({ 'Authorization': this.loginService.jwt });
  return this.httpClient.post(this.URL + '/addRole', appuser, { observe: 'response', headers: header });

}
  deleteUser(id: number){
  const header = new HttpHeaders({ 'Authorization': this.loginService.jwt });
  return this.httpClient.delete(this.URL + '/delete/'+ id, { observe: 'response', headers: header });
}

}


