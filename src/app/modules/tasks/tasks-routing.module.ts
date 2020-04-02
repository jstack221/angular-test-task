import { Routes, RouterModule } from '@angular/router';
import { TasksComponent } from "../tasks/components/tasks/tasks.component";
import { NgModule } from '@angular/core';

export const tasksRoutes: Routes = [
  {
    path: '',
    component: TasksComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(tasksRoutes)],
  exports: [RouterModule]
})

export class TasksRoutingModule {}