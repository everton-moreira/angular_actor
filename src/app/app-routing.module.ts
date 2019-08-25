import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { ActorListComponent } from './actor/actor-list/actor-list.component';
import { NotAuthGuard } from './guards/not-auth.guard';
import { AuthGuard } from './guards/auth.guard';
import { ActorNewComponent } from './actor/actor-new/actor-new.component';
import { ActorEditComponent } from './actor/actor-edit/actor-edit.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserNovoComponent } from './user/user-novo/user-novo.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    canActivate: [NotAuthGuard]
  },
  {
    path: 'atores',
    component: ActorListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'atores/novo-ator',
    component: ActorNewComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'atores/editar/:id',
    component: ActorEditComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'usuario',
    component: UserListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'usuario/novo-usuario',
    component: UserNovoComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'usuario/editar/:id',
    component: UserEditComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**', redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
