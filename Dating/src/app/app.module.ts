import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { SignupComponent } from './signup/signup.component';
import { ErrorInterceptorProvider } from './interceptor/error.interceptor';
import { ErrorComponent } from './error/error.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MessagesComponent } from './messages/messages.component';
import { ListsComponent } from './lists/lists.component';
import { MemberListComponent } from './member-list/member-list.component';

@NgModule({
   declarations: [
      AppComponent,
      NavbarComponent,
      LoginComponent,
      HomeComponent,
      FooterComponent,
      SignupComponent,
      ErrorComponent,
      MessagesComponent,
      ListsComponent,
      MemberListComponent,
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      BrowserAnimationsModule,
      LayoutModule,
      MatToolbarModule,
      FormsModule,
      ReactiveFormsModule,
      MatInputModule,
      MatButtonModule,
      MatFormFieldModule,
      MatDividerModule,
      MatSidenavModule,
      MatIconModule,
      MatListModule,
      MatTabsModule,
      MatDialogModule,
      AppRoutingModule,
      MatOptionModule,
      MatSelectModule,
      MatMenuModule,
      CommonModule
   ],
   providers: [
     ErrorInterceptorProvider
   ],
   bootstrap: [
      AppComponent
   ],
   entryComponents: [ErrorComponent]
})
export class AppModule { }
