import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list/user-list.component';
import { UserNovoComponent } from './user-novo/user-novo.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { LoadingModule } from '../shared/loading/loading.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [UserListComponent, UserNovoComponent, UserEditComponent],
    exports: [UserListComponent, UserNovoComponent, UserEditComponent],
    imports: [CommonModule, LoadingModule, RouterModule, FormsModule, ReactiveFormsModule],
    providers: []
})
export class UserModule { }
