import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { TaskRecord } from '../TaskRecord';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private taskService: TaskService) {}
  
  tasks?: TaskRecord[];
  
  loadTasks(): void {
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = JSON.parse(JSON.stringify(tasks));
      this.tasks?.sort((t1, t2) => t2.id - t1.id);
    });
  }
  

  ngOnInit(): void {
    this.loadTasks();
  }

}
