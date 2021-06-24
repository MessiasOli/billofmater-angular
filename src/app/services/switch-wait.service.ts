import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root'
})
export class SwitchWaitService {

  private subject = new Subject<string>();

  switchWait() {
      this.subject.next();
  }

  action(): Observable<string> {
      return this.subject.asObservable();
  }
}
