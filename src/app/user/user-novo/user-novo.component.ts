import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import * as sha512 from 'js-sha512';
import { ImageResult, ResizeOptions } from 'ng2-imageupload';

import { Usuario } from '../user.model';
import { UsuarioService } from '../user.service';

@Component({
  selector: 'app-user-novo',
  templateUrl: './user-novo.component.html',
  styles: []
})
export class UserNovoComponent implements OnInit {

  frm: FormGroup;
  id: number;
  lista: Usuario[];
  foto = '../../assets/img/camera.png';
  file: File;
  image_src: string = "";
  resizeOptions: ResizeOptions = {
    resizeMaxHeight: 64,
    resizeMaxWidth: 64,
    resizeQuality: 1.5,
    resizeType: 'image/png'
};
  
  @ViewChild('attachment') inputFile: ElementRef;

  ativo = [
            { id:'', nome:'Selecione abaixo' },
            { id: 1, nome:'Active' },
            { id: 0, nome:'Inactive' }
          ]

perfil = [
            { id:'', nome:'Selecione abaixo' },
            { id:'A', nome:'Administrator' },
            { id:'C', nome:'Read-only' }
          ]

  constructor(private formBuilder: FormBuilder
    , private userService: UsuarioService
    , private toastr: ToastrService
    , private ds: DomSanitizer
    , private router: Router
    ) { }

  ngOnInit() {
    this.frm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(250), Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.maxLength(150), Validators.email]],
      password: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(5)]],
      perfil: ['', [Validators.required]],
      foto: ['', [Validators.required]],
      ativo: ['', [Validators.required]]
    })
  }

  save() {
    
    if(this.frm.valid && !this.frm.pending) {
      const newUser = this.frm.getRawValue() as Usuario;
      var hash = sha512.sha512.create();
      hash.update(newUser.password);
      newUser.password = hash.hex();
      //console.log(hash.hex());
      //console.log(newUser);
      
      if(confirm('Confirma gravação desse usuário?')){
        this.userService.cadastrar(newUser).subscribe(
          () => {
            const message = `Usuário ${newUser.name} foi atualizado!`;
            this.toastr.success(message, 'Salvo!');
            this.router.navigate(['/usuario']);
          },
          (erro) => {
            this.toastr.error('Usuário não pode ser atualizado.', 'Falha!');
            this.toastr.error(erro, 'Falha!');
          }
        );
      }
        
    }
  }

  //////////////////////////////////////UPLOAD////////////////////////////////////////////////
  
  selected(imageResult: ImageResult) {
    this.image_src = imageResult.resized
        && imageResult.resized.dataURL
        || imageResult.dataURL;
    this.foto = imageResult.dataURL;
    this.frm.get('foto').setValue(this.image_src); 
  }

  handleFile(file: File) {
    this.file = file;
    const reader = new FileReader();
    reader.onload = (event: any) => { this.foto = event.target.result; this.frm.get('foto').setValue(reader.result); };
    reader.readAsDataURL(file);
  }

}
