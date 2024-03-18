import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { Observable, of } from 'rxjs';
import { User } from '../_models/user';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, BsDropdownModule, RouterOutlet, RouterLink, RouterLinkActive,],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent implements OnInit {

  public model:any = {};
  public currentUser$: Observable<User | null> = of(null)

  constructor(private accountService: AccountService, 
    private router: Router,
    private toastr: ToastrService) {
    
  }

  ngOnInit(): void {
    this.currentUser$ = this.accountService.currentUser$;
  }


  public login(): void {
      this.accountService.login(this.model).subscribe({
        next: () => {
          this.router.navigateByUrl('/members');
        },
        error: error => this.toastr.error(error.error)
      });
  }

  public logout(): void {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }

}

