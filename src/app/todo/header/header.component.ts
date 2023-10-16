import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from 'events';
import { TodoData } from 'src/app/@model/todo.model';
import { TodoApiService } from 'src/app/@service/todo-api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input()
  title!:string;
  @Input()
  placeHolder!: string;
  @Input()
  keyINInputText;
  @Input()
  todoDataList : TodoData[];


  constructor(private todoApiService: TodoApiService) { }

  ngOnInit() {
  }

  enterTodo() {
    const enterTodo: TodoData = {
      Editing: false,
      Thing: this.keyINInputText,
      Status: false,
    }
    this.todoApiService.insertTodoData(enterTodo).subscribe(data => {
      // 會直接自動回傳該筆insert的資料
      this.todoDataList.push(data);
    });
    this.keyINInputText = '';
  }
}
