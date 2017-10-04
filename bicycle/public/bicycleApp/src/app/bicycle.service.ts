import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class BicycleService {

  constructor(private _http: Http) { }

  register(RegUser){
    return this._http.post('/api/newuser', RegUser)
    .map((response: Response)=> response.json())
    .toPromise();
  }

  login(logUser){
    return this._http.post('/api/login', logUser)
    .map((response: Response) => response.json())
    .toPromise();
  }

  newBike(bike, user){
    return this._http.post('/api/newbike', bike)
    .map((response: Response) => response.json())
    .toPromise();
  }

  allBikes(){
    return this._http.get('/api/allBikes')
    .map((response: Response) => response.json())
    .toPromise();
  }

  allUsers(){
    return this._http.get('/api/allUsers')
    .map((response: Response) => response.json())
    .toPromise();
  }

  destroy(id){
    return this._http.delete(`/api/destroy/${id}` )
    .map((response: Response) => response.json())
    .toPromise();
  }

  currentUser(){
    return this._http.get('/api/currentuser')
    .map((response: Response) => response.json())
    .toPromise();
  }

  updatebike(id, bike){
    return this._http.put(`/api/updatebike/${id}`, bike)
    .map((response: Response) => response.json())
    .toPromise();
  }


  retrieveBike(id){
    return this._http.get(`/api/getbike/${id}`)
    .map((response) => response.json())
    .toPromise();
  }


}
