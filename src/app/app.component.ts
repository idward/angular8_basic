import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.initialAuthUserStatus();
  }

  ngOnDestroy(): void {
    this.authService.userDestroy.next();
    this.authService.userDestroy.complete();
  }
}
