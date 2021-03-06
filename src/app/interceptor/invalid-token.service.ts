import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root'
})
export class InvalidTokenApiService implements HttpInterceptor {
  constructor(private authService: LoginService, private toastr: ToastrService) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req)
    .pipe(
      catchError((errorResponse: HttpErrorResponse) => {
        if (errorResponse.status === 401) {
          this.toastr.error('Faça seu login novamente.', 'Sessão expirada!');
          this.authService.resetarSessao();
        }
        return throwError(errorResponse);
      })
    );
  }
}
