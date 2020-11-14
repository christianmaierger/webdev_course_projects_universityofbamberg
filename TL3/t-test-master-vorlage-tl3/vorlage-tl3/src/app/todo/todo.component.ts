import { Component, OnInit, Input } from '@angular/core';
import { Todo} from '../todo';


@Component({
  selector: 'a.app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css',
  '../../../node_modules/bootstrap/dist/css/bootstrap.min.css']
})
export class TodoComponent implements OnInit {
  @Input() todo: Todo;
  
  title: string;
  date: Date;
  description: string;
  state: boolean;

  constructor() {}
   // performs a request to /todo_list which is forwarded to the express server at localhost:3000/shopping_list (cf. proxy.conf.json)
   public async makeRequest() {
    let todo = await fetch('/backend/todo_list').then((response) =>
      response.json()
    );
    this.title = todo.title;
    this.date = todo.date;
    this.description = todo.description;
    this.state = todo.state;
  }

  ngOnInit(): void {
    this.title = this.todo.title;
      this.description = this.todo.description;
      this.date = this.todo.date;
      this.state = this.todo.state;
  }

  close(el): void {
    el.style.color = "grey";
  }

  remove(el): void {
    let id = el.todo.id;
    alert(id);
    fetch('http://localhost:3000/todoitem/' + id, {
  method: 'DELETE',
});
    var element = el;
   
    document.getElementById(el).outerHTML = "";
    element.remove();
    
  }
 
 /* delete(LIST) {
    this.deleteservice.deletelist({list: LIST, actionType: 'DELETE').subscribe((_data) => {
      this.doclists.splice(this.doclists.findIndex(list => list._id === LIST._id), 1);
    }, (error) => {
      console.log(error);}); }
    }   
} */

}