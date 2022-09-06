import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MainDashboardComponent, State } from './main-dashboard/main-dashboard.component';
import { TaskRecord } from './TaskRecord';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  getTasks(): Observable<TaskRecord[]> {
    let tasks: TaskRecord[] = [];
    for (let key of Object.keys(localStorage)) {
      let value = localStorage.getItem(key);
      if (value == undefined)
        continue;
      
      let task = this.parseTask(parseInt(key), value);
      if (task == undefined)
        continue;
      
      tasks.push(task);
    }
    return of(tasks);
  }

  findTask(id: number): Observable<TaskRecord | undefined> {
    let value = localStorage.getItem(String(id));
    if (value == undefined)
      return of(undefined);

      let task = this.parseTask(id, value);
      if (task === undefined)
    
        return of(undefined);

    return of(task);
  }

  addTask(taskName: string): Observable<boolean> {
    let task: TaskRecord = new TaskRecord(this.getGreatestId() + 1, taskName, false);
    localStorage.setItem(String(task.id), taskName + ',0');

    return of(this.taskExists(task));
  }

  updateTask(task: TaskRecord): Observable<boolean> {
    let existingTask = localStorage.getItem(String(task.id));

    if (existingTask == null)
      return of(false);

    let isCompletedString = '0';

    if (task.isCompleted)
      isCompletedString = '1';

    localStorage.setItem(String(task.id), task.name + ',' + isCompletedString);

    return of(this.taskExists(task));
  }

  deleteTask(id: number): Observable<boolean> {
    localStorage.removeItem(String(id));
    return of(!this.taskExists(new TaskRecord(id, '', false))); //Name and isCompleted are not important and therefore any value here should be OK.
  }

  private parseTask(id: number, value: string): TaskRecord | undefined {
    let lastIndexOfComma = value?.lastIndexOf(','); //The value after the last comma (0 or 1) indicates whether the task is completed.
    
    if (lastIndexOfComma < 0) //If there is no comma in the value, the whole text is treated as the name and the task is assumed not to be completed.
      return new TaskRecord(id, value, false);
    
    let name = value?.substring(0, lastIndexOfComma);
    let isCompletedString = value?.substring(lastIndexOfComma + 1);

    let isCompleted: boolean = false;

    if (isCompletedString == '1') //Only '1' is valid for the task to be treated as completed. For any other value, the task will be marked as "not completed".
      isCompleted = true;

    if (name == undefined)
      return;

    return new TaskRecord(id, name, isCompleted);
  }
  
  private taskExists(task: TaskRecord): boolean {
    let value = localStorage.getItem(String(task.id));
    if (value == undefined)
      return false;

    let existingTask = this.parseTask(task.id, value);
    if (existingTask === undefined)
      return false;
      
    return task.equals(existingTask);
  }

  private getGreatestId(): number {
    let greatest: number = 0;
    
    this.getTasks().subscribe((tasks) => {
        for (const task of tasks) {
          if (greatest < task.id)
            greatest = task.id;
        }
    })

    // for (const task of this.getTasks()) {
    //   if (greatest < task.id)
    //     greatest = task.id;
    // }

    return greatest;
  }

  constructor() { }
}
