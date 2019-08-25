import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, BehaviorSubject } from 'rxjs';
import { map, finalize } from 'rxjs/operators';
import * as jwtDecode from 'jwt-decode';

import { TokenService } from '../shared/services/token.service';
import { Usuario } from '../user/user.model'
import { environment } from '../../app/environments/environment';
import { TokenApi } from '../shared/token/token';
import { UsuarioService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  //private api = 'http://localhost:3000/api/actor';
  private api = environment.FilmApiUrl;
  private _autenticado: BehaviorSubject<boolean>;
  public readonly autenticado$: Observable<boolean>;

constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private usuarioService: UsuarioService
  ) {
    this._autenticado = new BehaviorSubject(false);
    this.autenticado$ = this._autenticado.asObservable();
  }

  logar(usuario: Usuario): Observable<boolean> {
    const url = `${this.api}/login`;
    return this.http.post(url, usuario).pipe(
      map((resposta: TokenApi) => {
        if (!this.criarSessao(resposta.token)) {
          throw new Error();
          //console.log('Erro');
        }
        return true;
      })
    );
  }

  deslogar() {
    const url = `${this.api}/logout`;
    return this.http.post<TokenApi>(url, {}).pipe(
      finalize(() => { this.resetarSessao(); })
    );
  }

  criarSessao(token: string) {
    try {
      const usuario: Usuario = jwtDecode(token);
      //console.log(usuario);
      this.usuarioService.setUsuario(usuario);
      this.tokenService.token = token;
      this._autenticado.next(true);
      return true;
    } catch (err) {
      return false;
    }
  }

  resetarSessao() {
    this.tokenService.resetarToken();
    if (this._autenticado.value) {
      this._autenticado.next(false);
    }
  }

}
