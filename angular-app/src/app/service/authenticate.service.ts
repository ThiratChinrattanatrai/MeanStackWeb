import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthenticateService {

    authToken = "";
    user;
    constructor(private http:HttpClient){}
    
    registerUser(user){
        // return this.http.post('http://localhost:3000/users/register',user);
        return this.http.post('users/register',user);
    }

    authenticateUser(user){
        // return this.http.post('http://localhost:3000/users/authenticate',user);
        return this.http.post('users/authenticate',user);
    }

    storeUserData(token,user){
        localStorage.setItem("token",token);
        localStorage.setItem("user",JSON.stringify(user));
        this.authToken = token;
        this.user = user;
    }

    loadProfile(){
        this.loadToken();
        let header = new HttpHeaders();
        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json',
              'Authorization': this.authToken
            })
          };
        // return this.http.get('http://localhost:3000/users/profile',httpOptions);
        return this.http.get('users/profile',httpOptions);
    }

    isTokenExpired(){
        const helper = new JwtHelperService();
        return helper.isTokenExpired(this.authToken);
    }

    loadToken(){
        this.authToken = localStorage.getItem("token");
    }

    logout(){
        this.authToken = null;
        this.user = null;
        localStorage.clear();
    }
}