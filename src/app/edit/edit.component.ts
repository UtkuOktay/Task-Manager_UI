import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskRecord } from '../TaskRecord';
import { TaskService } from '../task.service';
import { MainDashboardComponent, State } from '../main-dashboard/main-dashboard.component';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  @Input() task?: TaskRecord;
  name?: string;
  isCompleted?: boolean;

  constructor(private taskService: TaskService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    let param = this.route.snapshot.queryParamMap.get('id');
    if (param == null)
      return;
    
    this.taskService.findTask(parseInt(param)).subscribe((queriedTask) => {
      if (queriedTask == undefined)
        return;
    
      this.task = JSON.parse(JSON.stringify(queriedTask));
      this.name = this.task?.name;
      this.isCompleted = this.task?.isCompleted;
    });
    
  }

  submit(): void {
    if (this.task === undefined || this.name === undefined || this.isCompleted === undefined)
      return;
      
    this.taskService.updateTask(new TaskRecord(this.task?.id, this.name, this.isCompleted)).subscribe(response => {
      if (response.status === 200)
        MainDashboardComponent.state = State.itemUpdated;
      else
        MainDashboardComponent.state = State.error;
        this.routeToHomePage();
    });
  }

  routeToHomePage(): void {
    this.router.navigate(['/index']);
  }

}
