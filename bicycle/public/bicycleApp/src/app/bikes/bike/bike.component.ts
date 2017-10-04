import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-bike',
  templateUrl: './bike.component.html',
  styleUrls: ['./bike.component.css']
})
export class BikeComponent implements OnInit {

  @Input() bike;

  @Input() id;

  @Output() myEvent = new EventEmitter();


  constructor() { }

  ngOnInit() {
  }


  delete(id){
    this.myEvent.emit(id);
  }

 
}
