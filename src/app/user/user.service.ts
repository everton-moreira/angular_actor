import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable } from 'rxjs';

import { Usuario } from './user.model';
import { environment } from '../../app/environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private api = environment.FilmApiUrl;
  private _usuario: BehaviorSubject<Usuario[]>;
  public readonly usuario$: Observable<Usuario[]>;
  public readonly user$: Observable<Usuario>;
  private _user = new BehaviorSubject<Usuario>(null);  

  constructor(private _http: HttpClient) { 
    this._usuario = new BehaviorSubject([]);
    this.usuario$ = this._usuario.asObservable();
    this.user$ = this._user.asObservable();
  }

  getUsers(): Observable<Usuario[]> {
    //return console.log(`${this.api}`);

    return this.getLista().pipe(
      tap((user: Usuario[]) => {
        this._usuario.next(user);
      })
    );
  }

  getLista(): Observable<Usuario[]> {
    const url = `${this.api}/user`;
    //console.log(url);
    return this._http.get<Usuario[]>(url);
  }

  getUser(id: number): Observable<Usuario[]> {
    const url = `${this.api}/user/user_id/${id}`;
    //console.log(url);
    return this._http.get<Usuario[]>(url).pipe(
      tap((user: Usuario[]) => {
        this._usuario.next(user);
      })
    );
  }

  setUsuario(usuario: Usuario) {
    this._user.next(usuario);
  }

  cadastrar(usuario: Usuario) {
    const url = `${this.api}/user`;
    return this._http.post(url, usuario);
  }

  atualizar(usuario: Usuario, id: number) {
    const url = `${this.api}/user/user_id/${id}`;
    //console.log(usuario);
    return this._http.put(url, usuario);
  }

  excluir(id: number) {
    const url = `${this.api}/user/user_id/${id}`;
    return this._http.delete(url);
  }

}
