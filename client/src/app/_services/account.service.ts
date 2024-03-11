import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private _url = "http://localhost:5088/api/account/";
  private _currentUserSource = new BehaviorSubject<User | null>(null);
  public currentUser$ = this._currentUserSource.asObservable();

  constructor(private _http: HttpClient) { }

  public login(model:any): Observable<any> {
     return this._http.post<User>(this._url + "Login", model).pipe(
        map((response:User) => {
          const user = response;
          if(user) {
            localStorage.setItem('user', JSON.stringify(user));
            this._currentUserSource.next(user);
          }
        }
     ));
  }

  public register(model:any): Observable<any> {
    return this._http.post<User>(this._url + "Register", model).pipe(
       map((response:User) => {
         const user = response;
         if(user) {
           localStorage.setItem('user', JSON.stringify(user));
           this._currentUserSource.next(user);
         }
         return user;
       }
    ));
 }

  public setCurrentUser(user: User):void {
    this._currentUserSource.next(user);
  }

  public logout(): void {
    localStorage.removeItem('user');
    this._currentUserSource.next(null);
  }
}
