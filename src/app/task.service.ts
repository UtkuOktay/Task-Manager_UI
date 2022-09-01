import { Injectable } from '@angular/core';
import { TaskRecord } from './TaskRecord';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  getTasks(): TaskRecord[] {
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
    return tasks;
  }

  findTask(id: number) {
    let value = localStorage.getItem(String(id));
    if (value == undefined)
      return;

      let task = this.parseTask(id, value);
      if (task == undefined)
        return;

    return task;
  }

  addTask(taskName: string) {
    localStorage.setItem(String(this.getGreatestId() + 1), taskName + ',0');
  }

  updateTask(task: TaskRecord) {
    let existingTask = localStorage.getItem(String(task.id));

    if (existingTask == null)
      return;

    let isCompletedString = '0';

    if (task.isCompleted)
      isCompletedString = '1';

    localStorage.setItem(String(task.id), task.name + ',' + isCompletedString);
  }

  deleteTask(id: number) {
    localStorage.removeItem(String(id));
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

  private getGreatestId(): number {
    let greatest: number = 0;

    for (const task of this.getTasks()) {
      if (greatest < task.id)
        greatest = task.id;
    }

    return greatest;
  }

  constructor() { }
}
