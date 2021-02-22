import { AfterViewInit, Component, OnInit } from '@angular/core';
import { LeafletMap } from './leaflet-map';

@Component({
  selector: 'app-map-sweden',
  templateUrl: './map-sweden.component.html',
  styleUrls: ['./map-sweden.component.scss']
})
export class MapSwedenComponent implements OnInit, AfterViewInit {

  map:LeafletMap;

  constructor() { }

  ngAfterViewInit(): void {
    this.map = new LeafletMap('map') 
  }

  ngOnInit(): void {
  }

}
