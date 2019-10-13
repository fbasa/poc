import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UserModuleRoutingModule } from './user-module-routing.module';
import { UsersComponent } from './users/users.component';

import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [UsersComponent],
  imports: [
    CommonModule,
    FormsModule,
    UserModuleRoutingModule,

    SharedModule
  ]
})
export class UserModuleModule { }
