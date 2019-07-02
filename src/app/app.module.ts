import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { RecipesModule } from './modules/recipes/recipes.module';
import { ShoppingListModule } from './modules/shopping-list/shopping-list.module';

import { AuthInterceptorService } from './http/auth-interceptor.service';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/layout/header/header.component';

/**
 * 模块分类
 * Modules [AppModule AppRoutingModule FeaturedRoutingModule,
 * FeaturedModule, SharedModule]
 */
@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    RecipesModule,
    ShoppingListModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
