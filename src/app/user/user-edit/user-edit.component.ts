import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Usuario } from '../user.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from '../user.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styles: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  frm: FormGroup;
  id: number;
  lista: Usuario[];
  foto;
  file: File;
  
  @ViewChild('attachment') inputFile: ElementRef;

  ativo = [
            { id:'', nome:'Selecione abaixo' },
            { id:'true', nome:'Active' },
            { id:'false', nome:'Inactive' }
          ]

  perfil = [
            { id:'', nome:'Selecione abaixo' },
            { id:'A', nome:'Administrator' },
            { id:'C', nome:'Read-only' }
          ]

  constructor(private formBuilder: FormBuilder, private userService: UsuarioService
    , private toastr: ToastrService
    , private ds: DomSanitizer
    , private router: Router
    , private params: ActivatedRoute) { }

  ngOnInit() {

    this.frm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(250), Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.maxLength(150), Validators.email]],
      perfil: ['', [Validators.required]],
      foto: ['', [Validators.required]],
      ativo: ['', [Validators.required]]
    })

    this.id = this.params.snapshot.params['id'];
    this.getUser(this.id);
  }

  getUser(id: number){
    this.userService.getUser(id)
      .subscribe(
        lista => { 
          this.lista = lista; 
          const user = this.lista[0] as Usuario;
          this.setValues(user);
          this.foto = this.ds.bypassSecurityTrustUrl(user.foto);
          //console.log(user); 
        },
        () => {
          this.toastr.error('Falha ao pegar dados do ator.', 'Falha!');
        });
  }

  setValues(user: Usuario){
    this.frm.get('name').setValue(user.name);
    this.frm.get('email').setValue(user.email);
    this.frm.get('perfil').setValue(user.perfil);
    this.frm.get('ativo').setValue(user.ativo);
    this.frm.get('foto').setValue(user.foto);
  }

  save() {
    
    if(this.frm.valid && !this.frm.pending) {
      const newUser = this.frm.getRawValue() as Usuario;
      
      //console.log(newUser);
      
      this.userService.atualizar(newUser, this.id).subscribe(
        () => {
          const message = `Usuário ${newUser.name} foi atualizado!`;
          this.toastr.success(message, 'Salvo!');
          this.router.navigate(['/usuario/editar/', this.id]);
        },
        (erro) => {
          this.toastr.error('Usuário não pode ser atualizado.', 'Falha!');
          this.toastr.error(erro, 'Falha!');
        }
      );
      
        
    }
  }

  //////////////////////////////////////UPLOAD////////////////////////////////////////////////

  handleFile(file: File) {
    this.file = file;
    const reader = new FileReader();
    reader.onload = (event: any) => { this.foto = event.target.result; this.frm.get('foto').setValue(reader.result); };
    reader.readAsDataURL(file);
  }

}
