import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseComponent } from './base/base.component';

import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext'; 

@NgModule({
  declarations: [BaseComponent],
  imports: [
    CommonModule,

    TableModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
  ],
  exports: [
    TableModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
  ]
})
export class SharedModule { }
