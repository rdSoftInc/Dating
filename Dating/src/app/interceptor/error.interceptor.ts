import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpErrorResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ErrorComponent } from '../error/error.component';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private dialog: MatDialog) {}

  intercept(
    req: import('@angular/common/http').HttpRequest<any>,
    next: import('@angular/common/http').HttpHandler): import('rxjs').Observable<import('@angular/common/http').HttpEvent<any>> {
    return next.handle(req).pipe(

      catchError(error => {

        if (error.status === 401) {
          this.dialog.open(ErrorComponent, { data: {message: error.statusText }});
          return throwError(error.statusText);
        }

        if (error instanceof HttpErrorResponse) {
          const applicationError = error.headers.get('Application-Error');

          if (applicationError) {
            return throwError(applicationError);
          }

          const serverError = error.error;
          let modalStateErrors = '';
          if (serverError.errors && typeof serverError.errors === 'object') {
            for (const key in serverError.errors) {
              if (serverError.errors[key]) {
                modalStateErrors += serverError.errors[key][0] + '\n';

              }
            }
          }
          if (modalStateErrors) {
            this.dialog.open(ErrorComponent, { data: {message: modalStateErrors }});
          } else if (serverError) {
            this.dialog.open(ErrorComponent, { data: {message: serverError }});
          } else {
            this.dialog.open(ErrorComponent, { data: {message: 'Server Error !!!' }});
          }
          return throwError(modalStateErrors || serverError || 'Server Error');
        }
      })
    );
  }

}

export const ErrorInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptor,
  multi: true
}
