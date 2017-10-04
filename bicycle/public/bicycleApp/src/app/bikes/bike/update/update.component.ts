import {User} from '../../../user';
import {Bicycle} from '../../../bicycle';
import {BicycleService} from '../../../bicycle.service';
import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  
  allBikes: Array<Bicycle>;
  allUsers: Array<User>;

  updatedBike = new Bicycle();


  bike={};

  id = "";

  constructor(private _bikeService: BicycleService, private _route: ActivatedRoute, private _router: Router) {
   
   }

  ngOnInit() {
    this._route.paramMap
    .switchMap(params => {
      this.id= params.get("id");
      // console.log("BikeService loaded and url id given is: " , (params.get("id")));
      return this._bikeService.retrieveBike(params.get("id"))
    })
    .subscribe(bike => {
      this.bike =bike[0]; 
      this.updatedBike = bike[0]
    })


  
  }

  updateBike(){
    this._bikeService.updatebike(this.id, this.updatedBike)
    .then( data => {
      this._router.navigate(['/browse'])
    })
    .catch( err => {
      console.log(err);
    })
  }

}
