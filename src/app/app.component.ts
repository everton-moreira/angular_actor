import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from './login/login.service';
import { TokenService } from './shared/services/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  constructor(
    private router: Router,
    public authService: LoginService,
    private tokenService: TokenService
  ) { }

  ngOnInit() {

    if (this.tokenService.token) {
      this.authService.criarSessao(this.tokenService.token);
    }
    
    this.authService.autenticado$.subscribe(autenticado => {
      if (autenticado) {
        this.router.navigate(['/atores']);
      } else {
        this.router.navigate(['']);
      }
    });

  }

}
