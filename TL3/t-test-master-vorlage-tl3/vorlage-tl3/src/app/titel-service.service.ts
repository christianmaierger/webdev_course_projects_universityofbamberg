import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TitelServiceService {
  private message = new Subject<string>();
  providedMessage = this.message.asObservable();

  constructor() { }

  changeMessage(message: string): void {
     this.message.next(message);
     console.log("execution");
  }
}