import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
    title = 'Dating app';
    users: any;

    constructor(private _http: HttpClient) {}
  
    ngOnInit(): void {
      this._http.get('http://localhost:5088/api/users').subscribe({
        next: (response: any) => {
          this.users = response;
        },
        error: (error: any) => console.error(error),
        complete: () => console.log('complete')
      });
    }
}
