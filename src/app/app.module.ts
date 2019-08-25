import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ActorListComponent } from './actor/actor-list/actor-list.component';
import { MenuComponent } from './shared/menu/menu.component';
import { LoginComponent } from './login/login.component';
import { environment } from '../app/environments/environment';
import { TokenApiService } from './interceptor/token.service'
import { InvalidTokenApiService } from '../app/interceptor/invalid-token.service'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActorNewComponent } from './actor/actor-new/actor-new.component';
import { ActorEditComponent } from './actor/actor-edit/actor-edit.component';
import { LoadingModule } from './shared/loading/loading.module';
import { UserModule } from './user/user.module';

@NgModule({
  declarations: [
    AppComponent,
    ActorListComponent,
    MenuComponent,
    LoginComponent,
    ActorNewComponent,
    ActorEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    LoadingModule,
    UserModule,
    ToastrModule.forRoot(environment.toastConfig),
    HttpClientModule
  ],
  providers: [
    {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenApiService,
    multi: true
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: InvalidTokenApiService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
