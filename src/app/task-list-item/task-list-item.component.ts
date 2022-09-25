import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { MainDashboardComponent, State } from '../main-dashboard/main-dashboard.component';
import { TaskService } from '../task.service';
import { TaskRecord } from '../TaskRecord';

@Component({
  selector: 'app-task-list-item',
  templateUrl: './task-list-item.component.html',
  styleUrls: ['./task-list-item.component.css']
})
export class TaskListItemComponent {
  @Input() task?: TaskRecord;
  
  constructor(private taskService: TaskService, private homeComponent: HomeComponent, private router: Router) { }

  deleteButtonClick(): void {
    if (this.task == null)
      return;
    
    this.taskService.deleteTask(this.task.id).subscribe(response => {
      if (response.status === 200)
        MainDashboardComponent.state = State.itemDeleted;
      else
        MainDashboardComponent.state = State.error;
        
        this.homeComponent.loadTasks();
    });
    
  }

  routeToEditPage(): void {
    this.router.navigate(['/task'], { queryParams: {'id': this.task?.id}})
  }

}
