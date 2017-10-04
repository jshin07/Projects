import {UpdateComponent} from './bikes/bike/update/update.component';
import {BrowseComponent} from './browse/browse.component';
import {HomeComponent} from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListingsComponent } from "./listings/listings.component";
import { LogoffComponent } from "./logoff/logoff.component";



const routes: Routes = [
  {path: '', component:HomeComponent },
  {path: 'browse', component:BrowseComponent },
  {path: 'listings', component:ListingsComponent },
  {path: 'update/:id', component:UpdateComponent},
  {path: 'logoff', component:LogoffComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
