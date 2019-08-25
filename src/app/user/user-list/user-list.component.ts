import { Component, OnInit } from '@angular/core';
import { Usuario } from '../user.model';
import { UsuarioService } from '../user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styles: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  lista: Usuario[];
  img_ativo: string;

  constructor(public userService: UsuarioService
    , private toastr: ToastrService
    , private ds: DomSanitizer
    , private router: Router) { }

  ngOnInit() {
    this.getUsers();
  }

  convertPhoto(foto: string){
    return this.ds.bypassSecurityTrustUrl(foto);
  }

  convertProfile(profile: string){
    switch (profile) {
      case 'A':
        profile = "Administrator";
        break;
      case 'C':
        profile = "Read-only";
        break;
    }
    return profile;
  }

  convertAtivo(ativo: boolean){
    switch (ativo) {
      case true:
        this.img_ativo = "../../assets/img/accept.png";
        break;
      case false:
        this.img_ativo = "../../assets/img/slash.png";
        break;
    }
    return this.img_ativo;
  }

  getUsers(){
    this.lista = [];
    this.userService.getUsers()
      .subscribe(
        lista => { this.lista = lista; },
        () => {
          //console.log('Falhou');
          this.toastr.error('Falha ao atualizar listagem de usuarios.', 'Falha!');
        });
  }

  excluir(id: number, name: string) {
    const message = `Usuário ${name} foi excluído!`;
    const question = `Confirma exclusão de ${name}?`;
    
    if(confirm(question)) {
    
      this.userService.excluir(id).subscribe(
        () => {
          this.toastr.success(message, 'Exclusão!');
          this.getUsers();
          this.router.navigate(['/user']);
        },
        (erro) => {
          this.toastr.error('Usuário não pode ser excluído.', 'Falha!');
          //this.toastr.error(erro, 'Falha!');
        }
      );
    
    }
  }

}
