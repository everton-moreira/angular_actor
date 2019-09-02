import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Actor } from '../actor/actor.model'
import { environment } from '../../app/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ActorService {
  private api = environment.FilmApiUrl;
  private _actor: BehaviorSubject<Actor[]>;
  
  public readonly actor$: Observable<Actor[]>;

  constructor(private _http: HttpClient) { 
    this._actor = new BehaviorSubject([]);
    this.actor$ = this._actor.asObservable();
  }

  getActors(limite: number, pagina: number): Observable<Actor[]> {
    //return console.log(`${this.api}`);

    return this.getLista(limite, pagina).pipe(
      tap((actor: Actor[]) => {
        this._actor.next(actor);
      })
    );
  }

  getLista(limite: number, pagina: number): Observable<Actor[]> {
    const url = `${this.api}/actor?page=${pagina}&per_page=${limite}`;
    //console.log(url);
    return this._http.get<Actor[]>(url);
  }

  getFilterActors(limite: number, pagina: number, nome: string = ''): Observable<Actor[]> {
    return this.getListaFiltro(limite, pagina, nome).pipe(
      tap((actor: Actor[]) => {
        this._actor.next(actor);
      })
    );
  }

  getListaFiltro(limite: number, pagina: number, nome: string = ''): Observable<Actor[]> {
    const url = `${this.api}/actor/filter/first_name/${nome}`;
    //console.log(url);
    return this._http.get<Actor[]>(url);
  }

  getActor(id: number): Observable<Actor[]> {
    const url = `${this.api}/actor/actor_id/${id}`;
    //console.log(url);
    
    return this._http.get<Actor[]>(url).pipe(
      tap((actor: Actor[]) => {
        this._actor.next(actor);
      })
    );
  }

  cadastrar(usuario: Actor) {
    const url = `${this.api}/actor`;
    return this._http.post(url, usuario);
  }

  atualizar(usuario: Actor, id: number) {
    const url = `${this.api}/actor/actor_id/${id}`;
    return this._http.put(url, usuario);
  }

  excluir(id: number) {
    const url = `${this.api}/actor/actor_id/${id}`;
    return this._http.delete(url);
  }

}
