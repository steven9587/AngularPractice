import { Component, OnInit } from '@angular/core';
import { Todo, TodoStatusType } from '../../@models/todo.model';
import { TodoService } from '../../@services/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  title = 'OneTodo';

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.todoService.todoDataList = [];
    this.todoService.getData();
  }

}
