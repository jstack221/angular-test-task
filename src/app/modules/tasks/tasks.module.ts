import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TasksComponent } from './components/tasks/tasks.component';
import { FirstTaskComponent } from "./components/first-task/first-task.component";
import { TasksRoutingModule } from "./tasks-routing.module";
import { TasksHelperService } from "./services/tasks-helper.service";
import { CheckOnlineStatusService } from "./services/check-online-status.service";
import { UserService } from "./services/user.service";
import { SecondTaskComponent } from './components/second-task/second-task.component';
import { ThirdTaskComponent } from './components/third-task/third-task.component';
import { FourthTaskComponent } from './components/fourth-task/fourth-task.component';
import { FifthTaskComponent } from './components/fifth-task/fifth-task.component';

@NgModule({
  declarations: [
    FirstTaskComponent, 
    SecondTaskComponent, 
    ThirdTaskComponent,
    FourthTaskComponent,
    FifthTaskComponent,
    TasksComponent
  ],
  imports: [
    CommonModule,
    TasksRoutingModule,
    HttpClientModule
  ],
  providers: [
    TasksHelperService,
    CheckOnlineStatusService,
    UserService
  ],
  exports: [TasksComponent]
})

export class TasksModule { }
