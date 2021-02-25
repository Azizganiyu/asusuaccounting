
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { HttpHandlerService } from './services/http-handler/http-handler.service';
import { AppComponent } from './app.component';

import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageLayoutComponent } from './layouts/page-layout/page-layout.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared.module';
import { NoAccountComponent } from './components/no-account/no-account.component';

@NgModule({
  declarations: [
    AppComponent,
    PageLayoutComponent,
    NoAccountComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MDBBootstrapModule.forRoot(),
    FormsModule,
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: HttpHandlerService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
