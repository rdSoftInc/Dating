import { Component, OnInit } from '@angular/core';
import { Value } from '../model/value.model';
import { Subscription } from 'rxjs';
import { ValueService } from '../services/value.service';

@Component({
  selector: 'app-value',
  templateUrl: './value.component.html',
  styleUrls: ['./value.component.css']
})
export class ValueComponent implements OnInit {

  values: Value [];
  valueSub: Subscription;

  constructor(private valueService: ValueService) { }

  ngOnInit() {
    this.valueService.getValues();
    this.valueSub = this.valueService.getValuesListener().subscribe(response => {
      this.values = response;
    });
  }

}
