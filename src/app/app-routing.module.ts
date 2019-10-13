import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: 'users', loadChildren: './components/user-module/user-module.module#UserModuleModule' },
  { path: 'jobs', loadChildren: './components/job-module/job-module.module#JobModuleModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
