import {User} from '../user';
import {BicycleService} from '../bicycle.service';
import { Component, OnInit } from '@angular/core';
import { Bicycle } from './../bicycle';
import {Router} from '@angular/router';

@Component({
  selector: 'app-listings',
  templateUrl: './listings.component.html',
  styleUrls: ['./listings.component.css']
})
export class ListingsComponent implements OnInit {

  bike = new Bicycle();
  user = new User();
  allbikes= [];

  constructor(private _bikeService: BicycleService, private _router: Router) { }


  ngOnInit() {
    this.getBikes();
  }

  getBikes(){
    this._bikeService.allBikes()
    .then ( data =>{
      console.log(data);
      this.allbikes= data;
    })
    .catch( err => {
      console.log(err)
    })
  }

  createBike(){
    this._bikeService.newBike(this.bike, this.user)
    .then( data => {
      console.log(data);
      this.getBikes();
    })
    .catch( err => {
      console.log(err);
    })
    this.bike= new Bicycle();
  }

}
