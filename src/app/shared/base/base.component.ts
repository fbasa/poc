import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'poc-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit {

  destroyed$: Subject<boolean> = new Subject<boolean>();
  
  constructor() { }

  ngOnInit() {
  }

}
