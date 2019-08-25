import { Component, OnInit  } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

import { ActorService } from '../actor.service';
import { Actor } from '../actor.model';


@Component({
  selector: 'app-actor-list',
  templateUrl: './actor-list.component.html',
  styles: []
})
export class ActorListComponent implements OnInit  {

  lista: Actor[];
  qtdeRegistros: number;
  paginas: number[];

  lim = 15;
  pag = 0;
  totalPaginas = 0;
  rangePaginas = 5;

  iptFiltro = "";

  constructor(public actorService: ActorService
              , private toastr: ToastrService
              , private router: Router) { }

  ngOnInit () {
    this.getActors(this.lim, this.pag);
  }

  getActors(limite: number, pagina: number){
    this.lista = [];
    this.actorService.getActors(limite, pagina)
      .subscribe(
        lista => { this.lista = lista['rows']; this.qtdeRegistros = lista['count']; this.getTotalPaginas(this.pag, this.lim); },
        () => {
          //console.log('Falhou');
          this.toastr.error('Falha ao atualizar listagem de atores.', 'Falha!');
        });
  }

  getActorsFiltro(limite: number, pagina: number, nome: string = ''){
    this.lista = [];
    this.actorService.getFilterActors(limite, pagina, nome)
      .subscribe(
        lista => { this.lista = lista['rows']; this.qtdeRegistros = lista['count']; this.getTotalPaginas(this.pag, this.lim); },
        () => {
          this.toastr.error('Falha ao atualizar listagem de atores.', 'Falha!');
        });
  }

  setPaginacao(limite: number = 0, pagina: number = 0){
    this.lim = limite;
    this.pag = pagina;
    if(this.iptFiltro.length > 0) this.getActorsFiltro(this.lim, this.pag, this.iptFiltro);
    else this.getActors(this.lim, this.pag);
    this.getTotalPaginas(this.pag + 1, this.lim);
  }

  getTotalPaginas(pagina: number, registros: number, maxCount: number = 5){
    pagina = pagina || 1;
    this.totalPaginas = this.qtdeRegistros/registros;
    this.totalPaginas = Math.ceil(this.totalPaginas);
    this.paginas = [];
    //if((this.totalPaginas - pagina) < maxCount) console.log(pagina);
    if(((this.totalPaginas - pagina) < maxCount) && this.totalPaginas > maxCount){
      for(var i = 0; i < maxCount; i++) 
      { 
        this.paginas.push(this.totalPaginas - i);
      }
      this.paginas = this.paginas.reverse();
      //console.log(this.paginas);
    }else if(this.totalPaginas < maxCount){
      for(var i = 0; i < this.totalPaginas; i++) 
      { 
        this.paginas.push(pagina + i);
      }
      //console.log(this.paginas);
    }else{
      for(var i = 0; i < maxCount; i++) 
      { 
        this.paginas.push(pagina + i);
      }
      //console.log(this.paginas);
    }
  }

  reloadTable(){
    this.iptFiltro = '';
    this.lista = [];
    this.getActors(this.lim, 0);
  }

  excluir(id: number, first_name: string, last_name: string) {
    const message = `Ator ${first_name} ${last_name} foi excluído!`;
    const question = `Confirma exclusão de ${first_name} ${last_name}?`;
    
    if(confirm(question)) {
    
      this.actorService.excluir(id).subscribe(
        () => {
          //this.toastr.success(message, 'Salvo!');
          this.getActors(this.lim, this.pag);
          this.router.navigate(['/atores']);
        },
        (erro) => {
          this.toastr.error('Ator não pode ser excluído.', 'Falha!');
          //this.toastr.error(erro, 'Falha!');
        }
      );
    
    }
  }

}
