import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTabsModule } from '@angular/material/tabs';
import { MatOptionModule, MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { FileUploadModule } from 'ng2-file-upload';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { TimeagoModule } from 'ngx-timeago';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { SignupComponent } from './signup/signup.component';
import { ErrorComponent } from './error/error.component';
import { MessagesComponent } from './messages/messages.component';
import { ListsComponent } from './lists/lists.component';
import { MemberListComponent } from './member-list/member-list.component';
import { MemberDetailsComponent } from './member-details/member-details.component';
import { MemberEditComponent } from './member-edit/member-edit.component';
import { PhotoEditorComponent } from './photo-editor/photo-editor.component';

import { ErrorInterceptor } from './interceptor/error.interceptor';
import { AuthInterceptor } from './interceptor/auth.interceptor';

import { MemberDetailResolver } from './resolvers/member-detail.resolver';
import { MemberListResolver } from './resolvers/member-list.resolver';
import { MemberEditResolver } from './resolvers/member-edit.resolver';

import { AuthGuard } from './guards/auth.guard';
import { PreventUnsavedGuard } from './guards/prevent-unsaved.guard';

import { AppRoutingModule } from './app-routing.module';
import { ListResolver } from './resolvers/list.resolver';
import { MessagesResolver } from './resolvers/messages.resolver';
import { MemberMessagesComponent } from './member-messages/member-messages.component';

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
      MemberDetailsComponent,
      MemberEditComponent,
      PhotoEditorComponent,
      MemberMessagesComponent
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
      TimeagoModule.forRoot(),
      MatButtonModule,
      MatSnackBarModule,
      MatButtonToggleModule,
      MatFormFieldModule,
      MatPaginatorModule,
      MatDividerModule,
      MatDatepickerModule,
      MatNativeDateModule,
      MatSidenavModule,
      MatIconModule,
      MatListModule,
      MatTabsModule,
      MatDialogModule,
      AppRoutingModule,
      MatCardModule,
      MatOptionModule,
      MatSelectModule,
      MatMenuModule,
      CommonModule,
      NgxGalleryModule,
      FileUploadModule
   ],
   providers: [
     MemberDetailResolver,
     MemberListResolver,
     ListResolver,
     MemberEditResolver,
     AuthGuard,
     PreventUnsavedGuard,
     MessagesResolver,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor , multi: true},
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
   ],
   bootstrap: [
      AppComponent
   ],
   entryComponents: [ErrorComponent]
})
export class AppModule { }
