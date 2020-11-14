import { Component, OnInit } from '@angular/core';
import { TitelServiceService } from '../titel-service.service';
import { Todo } from '../todo';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css',
    '../../../node_modules/bootstrap/dist/css/bootstrap.min.css']

})
export class DashboardComponent implements OnInit {
  title:string = "Overview";
  response_array:Todo[] = [
    {
      id: 1,
      title: 'my TODO!!!',
      date: new Date(),
      description: 'Beschreibung',
      state: true, 
  },
  {
    id: 2,
    title: 'my 2. TODO!!!',
    date: new Date('December 17, 1995'),
    description: 'Monday',
    state: true, 
}];

  constructor(private titelServiceService: TitelServiceService) { 
    this.titelServiceService.changeMessage(this.title);
    this.makeRequest();
  }

  ngOnInit(): void {}

  // performs a request to localhost:4200/backend/test which is forwarded to the express server at localhost:3000/backend/test (cf. proxy.conf.json)
  public async makeRequest() {
    this.response_array = await fetch('/backend/todo_list').then((response) =>
      response.json()
    );
  }

}
