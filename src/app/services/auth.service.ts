import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { setting } from '../../assets/env';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { IToken } from '../../assets/interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private URI = setting.URI;
  constructor(private http: HttpClient) {}

  getToken(): Observable<any> {
    const body = new URLSearchParams();
    body.set('grant_type', 'password');
    body.set('client_id', 'app-cli');
    body.set('username', setting.USERNAME);
    body.set('password', setting.PASSWORD);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    return this.http
      .post(this.URI + '/identity/realms/fintatech/protocol/openid-connect/token', body, { headers })
      .pipe(
        map((value: any) => value.access_token),
        tap((value: string) => localStorage.setItem('access_token', value)),
      );
  }
}
