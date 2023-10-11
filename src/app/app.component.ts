import { Component, HostListener, OnInit } from '@angular/core';
import { TodoData, TodoListStatus } from './model/todo.model';
import { HttpClient } from '@angular/common/http';

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

  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    // 字串位置可以放檔案位置或api網址
    this.http.get<TodoData[]>('/api/todo2_16').subscribe(data => {
      this.todoDataList = data;
    });
  }



  toggleAll() {
    this.toggleAllStatus = !this.toggleAllStatus;
    this.todoDataList.forEach( item => {
      item.Status = this.toggleAllStatus;
    })
  }

  check(item: TodoData) {
    item.Status = !item.Status;
    this.toggleAllStatus = this.getCompletedTodoList().length == this.todoDataList.length ? true : false;
  }

  deleteTodo(item: TodoData) {
    this.todoDataList = this.todoDataList.filter(data => data != item);
  }

  enterTodo() {
    this.todoDataList.push(new TodoData(false, "00000000-0000-0000-0000-000000000000", this.keyINInputText, false, "2023-10-11T00:00:00"))
    this.keyINInputText = '';
  }

  editing(item: TodoData) {
    item.openEditing();
  }

  saveEditInput(item: TodoData, editInput: HTMLInputElement) {
    item.Thing = editInput.value;
    item.closeEditing();
  }

  closeEditing(item: TodoData) {
    item.closeEditing();
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
    this.todoDataList = this.todoDataList.filter(data => !data.Status);
  }
}
