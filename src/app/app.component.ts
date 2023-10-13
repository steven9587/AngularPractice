import { Component, HostListener, OnInit } from '@angular/core';
import { TodoData, TodoListStatus } from './@model/todo.model';
import { HttpClient } from '@angular/common/http';
import { TodoApiService } from './@service/todo-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title :string = 'todoThing';
  placeHolder : string = "What needs to be done???"
  toggleAllStatus : boolean = false;
  nowTodoListStatus = TodoListStatus.All;
  todoListStatus = TodoListStatus;
  keyINInputText = '';

  // todoDataList : TodoData[] = [
  //   {
  //     thing : '代辦事項1',
  //     status : false,
  //     editing : false
  //   } , {
  //     thing : '代辦事項2',
  //     status : true,
  //     editing : false
  //   } , {
  //     thing : '代辦事項3',
  //     status : false,
  //     editing : false
  //   }
  // ].map(data => new TodoData(data.thing, data.status, data.editing));
  todoDataList : TodoData[] = [];

  constructor(private http: HttpClient, private todoApiService: TodoApiService) {}

  ngOnInit(): void {
    // 字串位置可以放檔案位置或api網址
    this.todoApiService.getAllTodoData().subscribe(data => {
    // this.http.get<TodoData[]>('/api/todo2_16').subscribe(data => {
      this.todoDataList = data;
    });
  }

  toggleAll() {
    this.toggleAllStatus = !this.toggleAllStatus;
    this.todoDataList.forEach( item => {
      item.Status = this.toggleAllStatus;
    })
    // this.http.put('/api/todo2_16/Status/' + this.toggleAllStatus, null).subscribe();
    this.todoApiService.updateAllTodoDataStatus(this.toggleAllStatus).subscribe();
  }

  check(item: TodoData) {
    item.Status = !item.Status;
    // this.http.put('/api/todo2_16/' + item.TodoId, item).subscribe();
    this.todoApiService.updateTodoDataStatus(item).subscribe();
    this.toggleAllStatus = this.getCompletedTodoList().length == this.todoDataList.length ? true : false;
  }

  deleteTodo(item: TodoData) {
    // this.http.delete('/api/todo2_16/' + item.TodoId).subscribe();
    this.todoApiService.deleteTodoData(item).subscribe();
    this.todoDataList = this.todoDataList.filter(data => data != item);
  }

  enterTodo() {
    const enterTodo: TodoData = {
      Editing: false,
      Thing: this.keyINInputText,
      Status: false,
    }
    // this.http.post<TodoData>('/api/todo2_16', enterTodo).subscribe(data => {
    this.todoApiService.insertTodoData(enterTodo).subscribe(data => {
      // 會直接自動回傳該筆insert的資料
      this.todoDataList.push(data);
    });
    this.keyINInputText = '';
  }

  editing(item: TodoData) {
    item.Editing = true;
  }

  saveEditInput(item: TodoData, editInput: HTMLInputElement) {
    item.Thing = editInput.value;
    item.Editing = false;
  }

  closeEditing(item: TodoData) {
    // this.http.put('/api/todo2_16/' + item.TodoId, item).subscribe();
    this.todoApiService.updateTodoDataStatus(item).subscribe();
    item.Editing = false;
  }

  settodoListStatus(todoListStatusType: number){
    this.nowTodoListStatus = todoListStatusType;
  }

  get selectTodoList() {
    let selectedTodoList: TodoData[] =[];
    switch (this.nowTodoListStatus) {
      case TodoListStatus.Active:
        selectedTodoList = this.getActiveTodoList();
        break;
      case TodoListStatus.Completed:
        selectedTodoList = this.getCompletedTodoList();
        break;
      default:
        selectedTodoList = this.todoDataList;
      }
      return selectedTodoList;
  }

  getActiveTodoList(): TodoData[] {
    return this.todoDataList.filter(data => !data.Status);
  }

  getCompletedTodoList(): TodoData[] {
    return this.todoDataList.filter(data => data.Status);
  }

  clearCompleted() {
    // this.http.delete('/api/todo2_16/clearCompleted').subscribe();
    this.todoApiService.deleteAllCheckedTodoData().subscribe();
    this.todoDataList = this.todoDataList.filter(data => !data.Status);
  }
}
