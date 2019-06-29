import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoginMode: boolean = false;
  @ViewChild('f', { static: true }) authForm: NgForm;
  errorMessage: string;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  onSwitchMode(): void {
    this.isLoginMode = !this.isLoginMode;
  }

  onSignup(email: string, password: string): Observable<any> {
    return this.authService.signup(email, password);
  }

  onLogin(email: string, password: string): Observable<any> {
    return this.authService.login(email, password);
  }

  onSubmit() {
    const email = this.authForm.value.email;
    const password = this.authForm.value.password;
    let resultRes: Observable<any>;

    if (this.isLoginMode) {
      resultRes = this.onLogin(email, password);
    } else {
      resultRes = this.onSignup(email, password);
    }
    // recieve the response data
    resultRes.subscribe(
      data => {
        console.log(data);
        this.errorMessage = null;
        this.router.navigate(['/recipes']);
      },
      error => {
        console.log(error);
        this.errorMessage = error;
      }
    );
    // reset the form value
    this.authForm.reset();
  }
}
