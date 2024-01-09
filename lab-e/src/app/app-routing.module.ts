import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TasksComponent} from "./tasks/tasks.component";
import {ArchiveComponent} from "./archive/archive.component";

const routes: Routes = [
  {path: 'tasks', component: TasksComponent},
  {path: '', redirectTo: '/tasks', pathMatch: 'full'},
  {path: 'archive', component: ArchiveComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
