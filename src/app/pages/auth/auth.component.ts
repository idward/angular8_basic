import { AuthAction } from './../../store/actions/auth.action';
import {
  Component,
  OnInit,
  ViewChild,
  ComponentFactoryResolver,
  OnDestroy
} from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { AuthService } from './../../services/auth.service';
import { AlertComponent } from '../../components/alert/alert.component';
import { PlaceholderDirective } from './../../directives/placeholder.directive';

import { AppState } from 'src/app/store';
import * as AuthActions from '../../store/actions/auth.action';
import { AuthState } from 'src/app/store/reducers/auth.reducer';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoginMode: boolean = false;
  errorMessage: string;
  @ViewChild('f', { static: true }) authForm: NgForm;
  @ViewChild(PlaceholderDirective, { static: true })
  domContainer: PlaceholderDirective;
  alertCmpSubs: Subscription;
  authSubs: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.authSubs = this.store.select('auth').subscribe((data: AuthState) => {
      // don't dispatch anything inside subscribe method
      // import! import! import!
      // if (data.user && !data.authError) {
      //   this.store.dispatch(new AuthActions.LoginSuccess(data.user));
      // } else if (!data.user && data.authError) {
      //   this.showAlertDialog(data.authError);
      // }
      this.errorMessage = data.authError;
      if (this.errorMessage) {
        this.showAlertDialog(this.errorMessage);
      }
    });
  }

  onSwitchMode(): void {
    this.isLoginMode = !this.isLoginMode;
  }

  onSignup(email: string, password: string): void {
    // return this.authService.signup(email, password);
    this.store.dispatch(new AuthActions.SignupStart({ email, password }));
  }

  onLogin(email: string, password: string): void {
    // return this.authService.login(email, password);
    this.store.dispatch(new AuthActions.LoginStart({ email, password }));
  }

  onSubmit() {
    const email = this.authForm.value.email;
    const password = this.authForm.value.password;
    // let resultRes: Observable<any>;

    if (this.isLoginMode) {
      this.onLogin(email, password);
    } else {
      this.onSignup(email, password);
    }
    // recieve the response data
    // resultRes.subscribe(
    //   data => {
    //     console.log(data);
    //     this.errorMessage = null;
    //     this.router.navigate(['/recipes']);
    //   },
    //   error => {
    //     console.log(error);
    //     this.errorMessage = error;
    //     this.showAlertDialog(error);
    //   }
    // );
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
      this.store.dispatch(new AuthActions.ClearError());
    });
  }

  ngOnDestroy(): void {
    if (this.authSubs) {
      this.authSubs.unsubscribe();
    }
  }
}
