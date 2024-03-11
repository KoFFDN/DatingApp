import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NavComponent } from './nav/nav.component';
import { AccountService } from './_services/account.service';
import { User } from './_models/user';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HttpClientModule, NavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
    title = 'Dating app';
    users: any;

    constructor(private _http: HttpClient, private _accountService: AccountService) {}
  
    ngOnInit(): void {
      this.getUsers();
      this.setCurrentUser();
    }

    getUsers() {
      this._http.get('http://localhost:5088/api/users').subscribe({
        next: (response: any) => {
          this.users = response;
        },
        error: (error: any) => console.error(error),
        complete: () => console.log('complete')
      });
    }

    setCurrentUser(): void {
      if(!localStorage) return;
      const user = localStorage.getItem('user');
      if(!user) {
        return;
      }
      if(user) {
        this._accountService.setCurrentUser(JSON.parse(user));
      }
    } 
}
