import { Component, OnInit } from '@angular/core';
import { Todo, TodoStatusType } from 'src/app/@models/todo.model';
import { TodoService } from 'src/app/@services/todo.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {  
  TodoStatusType = TodoStatusType;

  get todoActive(): Todo[] {
    return this.todoService.todoActive;
  }

  get todoCompleted(): Todo[] {
    return this.todoService.todoCompleted;
  }

  get nowTodoStatusType() {
    return this.todoService.nowTodoStatusType;
  }

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
  }

  clearCompleted() {
    this.todoService.clearCompleted();
  }
 
  setTodoStatusType(type: number) {
    this.todoService.setTodoStatusType(type);
  }
}
