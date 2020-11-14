import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Location } from '@angular/common';
import { TitelServiceService } from '../titel-service.service';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css',
  '../../../node_modules/bootstrap/dist/css/bootstrap.min.css']
})
export class AddTodoComponent implements OnInit {
  fieldsEmpty: boolean = false;
  title:string = "Add/Edit";

  constructor( private location: Location, 
      private titelServiceService: TitelServiceService) {
        this.titelServiceService.changeMessage(this.title);
   }

  ngOnInit(): void {
    
  }

  add(title: string, description: string,
    date: Date, state: boolean ) {
    if (!title || !description || !date || !state) {
      this.fieldsEmpty = true;
      return;
    }
    async() => {
      const response = await fetch('/backend/addtodo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({title:title, description:description, date:date, state:state})
      });
      this.goBack();
    }

  }

  goBack(): void {
    this.location.back();
  }
}
