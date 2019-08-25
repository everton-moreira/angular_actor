import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Actor } from '../actor.model';
import { ActorService } from '../actor.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-actor-new',
  templateUrl: './actor-new.component.html',
  styles: []
})
export class ActorNewComponent implements OnInit {

  frm: FormGroup;

  constructor(private formBuilder: FormBuilder, private actorService: ActorService, private toastr: ToastrService, private router: Router) { }

  ngOnInit() {
    this.frm = this.formBuilder.group({
      first_name: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(2)]],
      last_name: ['', [Validators.required, Validators.maxLength(100), Validators.minLength(2)]]
    })
  }

  save() {
    
    if(this.frm.valid && !this.frm.pending) {
      const newActor = this.frm.getRawValue() as Actor;
      let dateTime = new Date();
      newActor.last_update = dateTime.toLocaleDateString('fr-CA') + ' ' + dateTime.toLocaleTimeString('pt-BR');
      newActor.first_name = newActor.first_name.toUpperCase();
      newActor.last_name = newActor.last_name.toUpperCase();
      
      //console.log(newActor);
      this.actorService.cadastrar(newActor).subscribe(
        () => {
          const message = `Ator ${newActor.first_name} ${newActor.last_name} foi criado!`;
          this.toastr.success(message, 'Salvo!');
          //this.frm.reset();
          this.router.navigate(['/atores']);
        },
        (erro) => {
          //this.toastr.error('Ator não pode ser criado.', 'Falha!');
          this.toastr.error(erro, 'Falha!');
        }
      );

    }
    
}

}
