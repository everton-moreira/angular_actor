import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { LoginService } from '../../login/login.service';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from '../../user/user.service';
import { Usuario } from '../../user/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styles: []
})
export class MenuComponent implements OnInit {

  public usuario: Usuario;
  public auth: boolean = false;
  foto64: string;
  foto: any;
  nome: string = "";
  data_access: string;
  url_active = '';

  constructor(private ds: DomSanitizer, private login: LoginService,
             public usuarioService: UsuarioService, private router: Router) { }

  deslogar() {
    /*
    this.login.deslogar().subscribe(() => {
      this.toastr.success('Já vai? Sentiremos sua falta :(', 'Show!');
    });
    */
    this.login.resetarSessao();
    this.login.autenticado$.subscribe(authenticated => {
      this.auth = authenticated;
    });
    this.router.navigate(['']);
  }

  ngOnInit() {
    this.usuarioService.user$.subscribe(users => {
      if(users)
      {
        this.usuario = users;
        this.foto = this.ds.bypassSecurityTrustUrl(this.usuario.foto);
        this.nome = this.usuario.name;
      }else{
        console.log('Erro');
      }
    });
    
    this.login.autenticado$.subscribe(authenticated => {
      this.auth = authenticated;
    });
  }

}
