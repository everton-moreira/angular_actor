import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ImageUploadModule } from 'ng2-imageupload';

import { LoadingModule } from '../shared/loading/loading.module';
import { UserListComponent } from './user-list/user-list.component';
import { UserNovoComponent } from './user-novo/user-novo.component';
import { UserEditComponent } from './user-edit/user-edit.component';

@NgModule({
  declarations: [UserListComponent, UserNovoComponent, UserEditComponent],
    exports: [UserListComponent, UserNovoComponent, UserEditComponent],
    imports: [CommonModule, LoadingModule, RouterModule, FormsModule, ReactiveFormsModule, ImageUploadModule],
    providers: []
})
export class UserModule { }
