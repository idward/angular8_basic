import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
/* custom modules */
import { CoreModule } from './modules/core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { HeaderModule } from './modules/header/header.module';
/* components */
import { AppComponent } from './app.component';
import { ErrorPageComponent } from './pages/errors/error-page/error-page.component';
/* reducers */
import { rootReducer } from './store';
import { AuthEffect } from './store/effects/auth.effect';
/* environment */
import { environment } from '../environments/environment';

/**
 * 模块分类
 * Modules [AppModule AppRoutingModule FeaturedRoutingModule,
 * FeaturedModule, SharedModule]
 */
@NgModule({
  declarations: [AppComponent, ErrorPageComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    HeaderModule,
    // AuthModule,
    // RecipesModule,
    // ShoppingListModule,
    StoreModule.forRoot(rootReducer),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([AuthEffect]),
    StoreRouterConnectingModule.forRoot(),
    AppRoutingModule,
    CoreModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
