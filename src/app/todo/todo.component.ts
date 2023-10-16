import { Component, OnInit } from '@angular/core';
import { TodoData, TodoListStatus } from '../@model/todo.model';
import { TodoApiService } from '../@service/todo-api.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  title :string = 'todoThing';
  placeHolder : string = "What needs to be done???"
  toggleAllStatus : boolean = false;
  nowTodoListStatus = TodoListStatus.All;
  todoListStatus = TodoListStatus;
  keyINInputText = '';

  todoDataList : TodoData[] = [];

  constructor(private todoApiService: TodoApiService) {}

  ngOnInit(): void {
    // 字串位置可以放檔案位置或api網址
    this.todoApiService.getAllTodoData().subscribe(data => {
      this.todoDataList = data;
    });
  }

  toggleAll() {
    this.toggleAllStatus = !this.toggleAllStatus;
    this.todoDataList.forEach( item => {
      item.Status = this.toggleAllStatus;
    })
    this.todoApiService.updateAllTodoDataStatus(this.toggleAllStatus).subscribe();
  }

  check(item: TodoData) {
    item.Status = !item.Status;
    this.todoApiService.updateTodoDataStatus(item).subscribe();
    this.toggleAllStatus = this.getCompletedTodoList().length == this.todoDataList.length ? true : false;
  }

  deleteTodo(item: TodoData) {
    this.todoApiService.deleteTodoData(item).subscribe();
    this.todoDataList = this.todoDataList.filter(data => data != item);
  }

  editing(item: TodoData) {
    item.Editing = true;
  }

  saveEditInput(item: TodoData, editInput: HTMLInputElement) {
    item.Thing = editInput.value;
    item.Editing = false;
  }

  closeEditing(item: TodoData) {
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
    this.todoApiService.deleteAllCheckedTodoData().subscribe();
    this.todoDataList = this.todoDataList.filter(data => !data.Status);
  }

}
