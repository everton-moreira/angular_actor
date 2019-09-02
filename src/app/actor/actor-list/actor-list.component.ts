import { Component, OnInit, OnDestroy  } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { ActorService } from '../actor.service';
import { Actor } from '../actor.model';

@Component({
  selector: 'app-actor-list',
  templateUrl: './actor-list.component.html',
  styles: ['./actor-list.component.css']
})
export class ActorListComponent implements OnInit, OnDestroy  {

  api = '';
  lista: Actor[];
  totalReg: number;
  totalPages: number;
  currPage: number = 1;
  previousPage: number = 0;
  nextPage: number = 0;

  regPerPage = 15;
  pageRange = [15,25,50,100];

  iptFiltro = "";

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();


  constructor(public actorService: ActorService
              , private toastr: ToastrService
              , private router: Router) { }

  ngOnInit () {
    this.dtOptions = {
      paging: false,
      info: false,
      searching: false
    };
    this.getActors(this.regPerPage, this.currPage);
  }

  getActors(limite: number, pagina: number){
    //console.log(limite);
    
    this.lista = [];
    this.actorService.getActors(limite, pagina)
      .subscribe(
        lista => { this.lista = lista['data'];
                  this.api = lista['path'];
                  this.totalReg = lista['total']; 
                  this.totalPages = lista['last_page']; 
                  this.currPage = lista['current_page']; 
                  lista['prev_page_url'] != null ? this.previousPage = parseInt(lista['prev_page_url'].replace(`${lista['path']}?page=`,''), 10) : 0;
                  lista['next_page_url'] != null ? this.nextPage = parseInt(lista['next_page_url'].replace(`${lista['path']}?page=`,''), 10) : 0;
                  this.dtTrigger.next();
                  //console.log(this.previousPage);
        },
        (erro) => {
          if(erro.status != '401') {this.toastr.error('Falha ao atualizar listagem de atores.', 'Falha!');console.log(erro);}
          //else this.toastr.error('Falha ao atualizar listagem de atores.', 'Falha!');
          //console.log(erro.status);
          //this.toastr.error('Falha ao atualizar listagem de atores.', 'Falha!');
        });
  }

  
  getActorsFiltro(limite: number, pagina: number, nome: string = ''){
    this.lista = [];
    this.actorService.getFilterActors(limite, pagina, nome)
      .subscribe(
        lista => { 
                  this.lista = lista['data'];
                  this.api = lista['path'];
                  this.totalReg = lista['total']; 
                  this.totalPages = lista['last_page']; 
                  this.currPage = lista['current_page']; 
                  lista['prev_page_url'] != null ? this.previousPage = parseInt(lista['prev_page_url'].replace(`${lista['path']}?page=`,''), 10) : 0;
                  lista['next_page_url'] != null ? this.nextPage = parseInt(lista['next_page_url'].replace(`${lista['path']}?page=`,''), 10) : 0;
         },
        () => {
          this.toastr.error('Falha ao atualizar listagem de atores.', 'Falha!');
        });
  }

  setPaginacao(limite: number = 0, pagina: number = 0){
    this.regPerPage = limite;
    this.currPage = pagina;
    this.previousPage = (pagina == 1 ? 0 : pagina);
    //console.log(pagina);
    this.dtTrigger.unsubscribe();
    
    if(this.iptFiltro.length > 0) this.getActorsFiltro(this.regPerPage, this.currPage, this.iptFiltro);
    else this.getActors(this.regPerPage, this.currPage);
    
  }
  reloadTable(){
    this.iptFiltro = '';
    this.lista = [];
    this.currPage = 1;
    this.previousPage = 0;
    this.getActors(this.regPerPage, this.currPage);
  }

  excluir(id: number, first_name: string, last_name: string) {
    const message = `Ator ${first_name} ${last_name} foi excluído!`;
    const question = `Confirma exclusão de ${first_name} ${last_name}?`;
    
    if(confirm(question)) {
    
      this.actorService.excluir(id).subscribe(
        () => {
          //this.toastr.success(message, 'Salvo!');
          this.getActors(this.regPerPage, this.currPage);
          this.router.navigate(['/atores']);
        },
        (erro) => {
          this.toastr.error('Ator não pode ser excluído.', 'Falha!');
          //this.toastr.error(erro, 'Falha!');
        }
      );
    
    }
  }

  ngOnDestroy(): void {
    this.lista = [];
    this.dtTrigger.unsubscribe();
  }

}
