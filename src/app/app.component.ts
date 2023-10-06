import { Component, HostListener } from '@angular/core';
import { TodoData, TodoListStatus } from './model/todo.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title :string = 'todoThing';
  placeHolder : string = "What needs to be done???"
  toggleAllStatus : boolean = false;
  nowTodoListStatus = TodoListStatus.All;
  todoListStatus = TodoListStatus;

  todoDataList : TodoData[] = [
    {
      thing : '代辦事項1',
      status : false,
      editing : false
    } , {
      thing : '代辦事項2',
      status : true,
      editing : false
    } , {
      thing : '代辦事項3',
      status : false,
      editing : false
    }
  ].map(data => new TodoData(data.thing, data.status, data.editing));

  toggleAll() {
    this.toggleAllStatus = !this.toggleAllStatus;
    this.todoDataList.forEach( item => {
      item.status = this.toggleAllStatus;
    })
  }

  check(item: TodoData) {
    item.status = !item.status;
    this.toggleAllStatus = this.getCompletedTodoList().length == this.todoDataList.length ? true : false;
  }

  deleteTodo(item: TodoData) {
    this.todoDataList = this.todoDataList.filter(data => data != item);
  }

  enterTodo(inputText: HTMLInputElement) {
    this.todoDataList.push(new TodoData(inputText.value, false, false))
    inputText.value = '';
  }

  editing(item: TodoData) {
    item.openEditing();
  }

  saveEditInput(item: TodoData, editInput: HTMLInputElement) {
    item.thing = editInput.value;
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
    return this.todoDataList.filter(data => !data.status);
  }

  getCompletedTodoList(): TodoData[] {
    return this.todoDataList.filter(data => data.status);
  }

  clearCompleted() {
    this.todoDataList = this.todoDataList.filter(data => !data.status);
  }
}
