import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TodoData } from '../@model/todo.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoApiService {
  private url :string = '/api/todo2_16';

  constructor(private http: HttpClient) { }

  getAllTodoData(): Observable<TodoData[]> {
    return this.http.get<TodoData[]>(this.url);
  }

  insertTodoData(insertItem: TodoData) {
    return this.http.post<TodoData>(this.url, insertItem);
  }

  deleteTodoData(item: TodoData) {
    return this.http.delete(`${this.url}/${item.TodoId}`);
  }

  deleteAllCheckedTodoData() {
    return this.http.delete(`${this.url}/clearCompleted`);
  }

  updateTodoDataStatus(item: TodoData) {
    return this.http.put(`${this.url}/${item.TodoId}`, item);
  }

  updateAllTodoDataStatus(status: boolean) {
    return this.http.put(`${this.url}/Status/${status}`, null);
  }
}
