import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MapSwedenComponent } from './map-sweden/map-sweden.component';

const routes: Routes = [
  {path: 'map' , component:MapSwedenComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
