import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
/* custom modules */
import { CoreModule } from './modules/core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { RecipesModule } from './modules/recipes/recipes.module';
import { ShoppingListModule } from './modules/shopping-list/shopping-list.module';
import { AuthModule } from './modules/auth/auth.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { ErrorPageComponent } from './pages/errors/error-page/error-page.component';

/**
 * 模块分类
 * Modules [AppModule AppRoutingModule FeaturedRoutingModule,
 * FeaturedModule, SharedModule]
 */
@NgModule({
  declarations: [AppComponent, HeaderComponent, ErrorPageComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AuthModule,
    ShoppingListModule,
    RecipesModule,
    AppRoutingModule,
    CoreModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
