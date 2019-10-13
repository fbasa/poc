import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { JobModuleRoutingModule } from './job-module-routing.module';
import { JobsComponent } from './jobs/jobs.component';

import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [JobsComponent],
  imports: [
    CommonModule,
    FormsModule,
    JobModuleRoutingModule,

    SharedModule
  ]
})
export class JobModuleModule { }
