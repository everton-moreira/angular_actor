import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { ActorService } from '../actor.service';
import { ToastrService } from 'ngx-toastr';
import { Actor } from '../actor.model';

@Component({
  selector: 'app-actor-edit',
  templateUrl: './actor-edit.component.html',
  styles: []
})
export class ActorEditComponent implements OnInit {

  frm: FormGroup;
  id: number;
  lista: Actor[];

  constructor(private formBuilder: FormBuilder, private actorService: ActorService
              , private toastr: ToastrService
              , private router: Router
              , private params: ActivatedRoute) { }

  ngOnInit() {
    
    this.frm = this.formBuilder.group({
      first_name: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(2)]],
      last_name: ['', [Validators.required, Validators.maxLength(100), Validators.minLength(2)]]
    })

    this.id = this.params.snapshot.params['id'];
    this.getActor(this.id);
    
  }

  setValues(ator: Actor){
    this.frm.get('first_name').setValue(ator.first_name);
    this.frm.get('last_name').setValue(ator.last_name);
  }

  getActor(id: number){
    this.actorService.getActor(id)
      .subscribe(
        lista => { 
          this.lista = lista; 
          const ator = this.lista[0] as Actor;
          this.setValues(ator);
        },
        (erro) => {
          this.toastr.error('Falha ao pegar dados do ator.', 'Falha!');
          console.log(erro);
        });
  }

  save() {
    
    if(this.frm.valid && !this.frm.pending) {
      const newActor = this.frm.getRawValue() as Actor;
      let dateTime = new Date();
      newActor.last_update = dateTime.toLocaleDateString('fr-CA') + ' ' + dateTime.toLocaleTimeString('pt-BR');
      newActor.first_name = newActor.first_name.toUpperCase();
      newActor.last_name = newActor.last_name.toUpperCase();
      
      //console.log(newActor);
      
      this.actorService.atualizar(newActor, this.id).subscribe(
        () => {
          const message = `Ator ${newActor.first_name} ${newActor.last_name} foi atualizado!`;
          this.toastr.success(message, 'Salvo!');
          this.router.navigate(['/atores/editar/', this.id]);
        },
        (erro) => {
          //console.log(erro);
          this.toastr.error('Ator não pode ser atualizado.', 'Falha!');
          this.toastr.error(erro, 'Falha!');
        }
      );
        
    }
  }
}
