import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { Observable, of } from 'rxjs';
import { User } from '../_models/user';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, BsDropdownModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent implements OnInit {

  public model:any = {};
  public currentUser$: Observable<User | null> = of(null)

  constructor(private accountService: AccountService) {
    
  }

  ngOnInit(): void {
    this.currentUser$ = this.accountService.currentUser$;
  }


  public login(): void {
      this.accountService.login(this.model).subscribe({
        next: () => {},
        error: error => console.log(error)
      });
  }

  public logout(): void {
    this.accountService.logout();
  }

}
