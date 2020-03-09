import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Value } from '../model/value.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ValueService {

  valuesListener = new Subject<Value[]>();

  constructor(private http: HttpClient) { }

  getValuesListener() {
    return this.valuesListener.asObservable();
  }

  getValues() {
    this.http.get<Value[]>('http://localhost:5000/api/values').subscribe(response => {
      this.valuesListener.next(response);
    });
  }

}
