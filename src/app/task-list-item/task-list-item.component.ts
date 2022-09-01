import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { TaskService } from '../task.service';
import { TaskRecord } from '../TaskRecord';

@Component({
  selector: 'app-task-list-item',
  templateUrl: './task-list-item.component.html',
  styleUrls: ['./task-list-item.component.css']
})
export class TaskListItemComponent implements OnInit {
  @Input() task?: TaskRecord;
  
  constructor(private taskService: TaskService, private homeComponent: HomeComponent, private router: Router) { }

  ngOnInit(): void {  }

  deleteButtonClick(): void {
    if (this.task == null)
      return;
    
    this.taskService.deleteTask(this.task.id);
    this.homeComponent.loadTasks();
  }

  routeToEditPage(): void {
    this.router.navigate(['/task'], { queryParams: {'id': this.task?.id}})
  }

}
