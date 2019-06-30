import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { RecipesModule } from './modules/recipes/recipes.module';

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
    FormsModule,
    HttpClientModule,
    RecipesModule,
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
