import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './modules/material.module';

import { AppComponent } from './app.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { UserPageComponent } from './pages/user-page/user-page.component';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { userReducer } from '@store/reducers/user.reducers';
import { loaderReducer } from '@store/reducers/loader.reducer';
import { UserEffects } from '@store/effects/user.effects';

import { ScriptLoaderService } from './services/script-loader.service';
import { GoogleAuthService } from '@services/google-auth.service';
import { AuthGuard } from './guards/auth.guard';
import { AuthService } from '@services/auth.service';

@NgModule({
  providers: [
    ScriptLoaderService,
    GoogleAuthService,
    AuthService,
    AuthGuard
  ],
  declarations: [
    AppComponent,
    LoginPageComponent,
    UserPageComponent
  ],
  imports: [
    StoreModule.forRoot({
      user: userReducer,
      loader: loaderReducer
    }),
    EffectsModule.forRoot([UserEffects]),
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    MaterialModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
