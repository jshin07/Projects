import {Router} from '@angular/router';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Bicycle } from './../bicycle';
import { BicycleService } from '../bicycle.service';
import { User } from './../user';

@Component({
  selector: 'app-bikes',
  templateUrl: './bikes.component.html',
  styleUrls: ['./bikes.component.css']
})
export class BikesComponent implements OnInit {
  @Input() allBikes;
  allUsers: Array<User>;
  currentUser= {};
  newlist;

  
  @Output() bikeDeleted:EventEmitter<String> = new EventEmitter();

  constructor(private _bikeService: BicycleService, private _router: Router) { }

  ngOnInit() {

    this._bikeService.currentUser()
    .then (data => {
      // console.log(data.error);
      if (data.error == "not in session"){
        this._router.navigate(['/'])
      }
      this.currentUser = data;
    })
    .catch( err => {
      console.log(err);
    })

    this._bikeService.allUsers()
    .then ( data => {
      console.log(data);
      this.allUsers = data;
    })
    .catch( err => {
      console.log(err);
    })

  }


  delete(id){
    this._bikeService.destroy(id)
    .then ( data => {
      console.log(data);
      this.bikeDeleted.emit("true");
    })
    .catch (err => {
      console.log(err)
    })
  }


}
