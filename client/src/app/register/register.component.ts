import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { response } from 'express';
import { error } from 'console';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  @Output() 
  cancelRegister = new EventEmitter<boolean>();

  model: any = {};

  constructor(private accountService: AccountService, private toastr: ToastrService) {}


  public register() {
    this.accountService.register(this.model).subscribe({
      next: () => this.cancel(),
      error: error => this.toastr.error(error.error)
    });
  }

  public cancel() {
    this.cancelRegister.emit(false);
  } 

}
