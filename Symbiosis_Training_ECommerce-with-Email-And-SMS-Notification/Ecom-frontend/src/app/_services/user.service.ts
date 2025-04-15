import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserAuthService } from './user-auth.service';
import { Observable } from 'rxjs';

interface RegisterData {
  username: string;
  email: string;
  password: string;
}

interface LoginData {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly PATH_OF_API = 'http://localhost:9090';

  private readonly requestHeader = new HttpHeaders({ 'No-Auth': 'True' });

  constructor(
    private httpclient: HttpClient,
    private userAuthService: UserAuthService
  ) {}

  public register(registerData: RegisterData): Observable<any> {
    return this.httpclient.post(`${this.PATH_OF_API}/registerNewUser`, registerData);
  }

  public login(loginData: LoginData): Observable<any> {
    return this.httpclient.post(`${this.PATH_OF_API}/authenticate`, loginData, {
      headers: this.requestHeader,
    });
  }

  public forUser(): Observable<string> {
    return this.httpclient.get(`${this.PATH_OF_API}/forUser`, { responseType: 'text' });
  }

  public forAdmin(): Observable<string> {
    return this.httpclient.get(`${this.PATH_OF_API}/forAdmin`, { responseType: 'text' });
  }

  public roleMatch(allowedRoles: string[]): boolean {
    const userRoles = this.userAuthService.getRoles();

    if (!userRoles || userRoles.length === 0) {
      return false;
    }

    return userRoles.some((role) => allowedRoles.includes(role.roleName));
  }
}
