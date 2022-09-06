import { Component, OnInit } from '@angular/core';
import { HomeComponent } from '../home/home.component';
import { TaskService } from '../task.service';

export enum State { none, newItemAdded, itemUpdated, itemDeleted, error }

@Component({
  selector: 'app-main-dashboard',
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.css']
})
export class MainDashboardComponent implements OnInit {

  taskName: string = "";
  static state: State = State.none;
  
  stateDict = new Map();

  constructor(private taskService: TaskService, private homeComponent: HomeComponent) { }

  ngOnInit(): void {
    this.stateDict.set(State.newItemAdded, "The task was successfully added.");
    this.stateDict.set(State.itemDeleted, "The task was successfully deleted.");
    this.stateDict.set(State.itemUpdated, "The task was successfully updated.");
    this.stateDict.set(State.error, "The operation could not be completed.");
  }

  submitButtonClick(): void {
    if (this.taskName == "")
      return;
    
    this.taskService.addTask(this.taskName).subscribe((result) => {
      if (result)
        MainDashboardComponent.state = State.newItemAdded;
      else
        MainDashboardComponent.state = State.error;
    });
    
    this.taskName = "";
    this.homeComponent.loadTasks();
  }

  getState(): State {
    return MainDashboardComponent.state;
  }

}