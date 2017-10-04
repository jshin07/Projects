import {Router} from '@angular/router';
import {BicycleService} from '../bicycle.service';
import { Component, OnInit } from '@angular/core';
import { User } from './../user';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  logUser = new User();
  regUser = new User();
  errorMessage = "";

 
   constructor(private _bikeService: BicycleService, private _router: Router) { }
 
   ngOnInit() {
  }

   login(){
    this._bikeService.login(this.logUser)
    .then( data => {
      console.log(data);
      this._router.navigate(['/browse'])
    })
    .catch (err => {
      console.log(err);
    })
   }
 
   register(){
    this._bikeService.register(this.regUser)
    .then( data => {
      console.log(data);
    })
    .catch (err =>{
      console.log(err._body);
      this.errorMessage = err.body;
    })
   }

 
}
