import {
  Component,
  OnInit,
  ViewChild,
  ComponentFactoryResolver
} from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';

import { AuthService } from './../../services/auth.service';
import { AlertComponent } from '../../components/alert/alert.component';
import { PlaceholderDirective } from './../../directives/placeholder.directive';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoginMode: boolean = false;
  errorMessage: string;
  @ViewChild('f', { static: true }) authForm: NgForm;
  @ViewChild(PlaceholderDirective, { static: true })
  domContainer: PlaceholderDirective;
  alertCmpSubs: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

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
        this.showAlertDialog(error);
      }
    );
    // reset the form value
    this.authForm.reset();
  }

  showAlertDialog(message: string): void {
    // create component factory
    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(
      AlertComponent
    );
    const alertViewContainer = this.domContainer.viewContainerRef;
    alertViewContainer.clear();
    // view container to append child component
    const alertCmp = alertViewContainer.createComponent(alertCmpFactory);
    // get property in component
    alertCmp.instance.message = message;
    // subscribe close event
    this.alertCmpSubs = alertCmp.instance.closeEvt.subscribe(() => {
      alertViewContainer.clear();
      this.alertCmpSubs.unsubscribe();
    });
  }
}
