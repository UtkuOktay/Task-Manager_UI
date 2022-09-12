import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { MainDashboardComponent, State } from './main-dashboard/main-dashboard.component';
import { TaskRecord } from './TaskRecord';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private httpClient: HttpClient) { }

  private webApiUrl = 'http://localhost:8080/api/task/'

  getTasks(): Observable<string> {
    return this.httpClient.get<string>(this.webApiUrl + 'list');
  }

  findTask(id: number): Observable<string> {
    return this.httpClient.get<string>(this.webApiUrl + id);
  }

  addTask(taskName: string): Observable<HttpResponse<any>> {
    return this.httpClient.post<HttpResponse<any>>(this.webApiUrl + 'add', taskName, {observe: 'response'});
  }

  updateTask(task: TaskRecord): Observable<HttpResponse<any>> {
    return this.httpClient.put<HttpResponse<any>>(this.webApiUrl + 'update', JSON.stringify(task), {headers: new HttpHeaders({'Content-Type': 'application/json'}), observe: 'response'});
  }

  deleteTask(id: number): Observable<HttpResponse<any>> {
    return this.httpClient.delete<HttpResponse<any>>(this.webApiUrl + 'delete/' + id, {observe: 'response'});
  }
}
