import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NavComponent } from './nav/nav.component';
import { AccountService } from './_services/account.service';
import { HomeComponent } from './home/home.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, HttpClientModule, NavComponent, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
    title = 'Dating app';
    users: any;
    private isLocalStorageAvailable = typeof localStorage !== 'undefined';

    // check everywhere you use loaclStorage
  

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
     if(!this.isLocalStorageAvailable) {
        return;
     }
      const user = localStorage?.getItem('user');
      if(!user) {
        return;
      }
      if(user) {
        this._accountService.setCurrentUser(JSON.parse(user));
      }
    } 
}
