import { Component } from '@angular/core';
import { TitelServiceService } from './titel-service.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [
  './app.component.css',
  '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
  ],
})
export class AppComponent {
  title:string = 'Overview';
  
  constructor(private titelServiceService: TitelServiceService) {
    titelServiceService.providedMessage.subscribe( 
      providedMessage => this.title = providedMessage);
  }
}
