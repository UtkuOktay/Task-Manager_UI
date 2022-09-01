import { Component, OnInit } from '@angular/core';
import { HomeComponent } from '../home/home.component';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-main-dashboard',
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.css']
})
export class MainDashboardComponent implements OnInit {

  taskName: string = "";
  newItemAdded: boolean = false;

  constructor(private taskService: TaskService, private homeComponent: HomeComponent) { }

  ngOnInit(): void {
  }

  submitButtonClick(): void {
    if (this.taskName == "")
      return;
    
    this.taskService.addTask(this.taskName);
    this.taskName = "";
    this.newItemAdded = true;

    this.homeComponent.loadTasks();
  }

}
