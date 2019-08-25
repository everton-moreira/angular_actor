import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root'
})
export class NotAuthGuard implements CanActivate {
  constructor(private authService: LoginService) { }
  canActivate(): Observable<boolean> {
    return this.authService.autenticado$.pipe(
      map(autenticado => {
        return !autenticado;
      })
    );
  }
}
