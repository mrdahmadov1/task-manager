import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { environment } from '../environments/environment';
import { MainLayoutComponent } from './main/main-layout/main-layout.component';
import { StoreModule } from '@ngrx/store';
import { profileReducer } from './store/user/profile.reducer';

@NgModule({
  declarations: [AppComponent, NotFoundComponent, MainLayoutComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({ profile: profileReducer }),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
