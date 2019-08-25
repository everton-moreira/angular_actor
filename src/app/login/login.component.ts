import { Component } from '@angular/core';

import { ToastrService } from 'ngx-toastr';

import { Usuario } from '../user/user.model';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent {

  public usuario: Usuario = <Usuario>{};

  constructor(
    private loginService: LoginService,
    private toastr: ToastrService
  ) { }
  
  onSubmit() {
    //console.log(this.usuario);
    this.loginService.logar(this.usuario).subscribe(
      () => {
        this.toastr.success('Login realizado com sucesso.', 'Show!');
      },
      (erro) => {
        if (erro.status && erro.status === 401) {
          this.toastr.error('E-mail e/ou senha incorretos.', 'Falha!');
        } else {
          //this.toastr.error('Não foi possível realizar login.', 'Falha!');
          this.toastr.error(erro, 'Falha!');
        }
      }
    );
  }
  
}
