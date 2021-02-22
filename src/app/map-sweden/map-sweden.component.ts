import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LeafletMap } from './leaflet-map';

@Component({
  selector: 'app-map-sweden',
  templateUrl: './map-sweden.component.html',
  styleUrls: ['./map-sweden.component.scss']
})
export class MapSwedenComponent implements OnInit, AfterViewInit, OnInit {

  map:LeafletMap;
  kommunKod:string = "0162"

  kommunKodForm = this.fb.group({

    kommunKod: ['']

  })

  constructor(
      private fb:FormBuilder,
      private route:ActivatedRoute
      ) { }

  ngAfterViewInit(): void {
    this.map = new LeafletMap('map', this.kommunKod) 
  }

  ngOnInit(): void {
    
    this.route.queryParams.subscribe(params => {
      this.kommunKod = params["kommun"];
      console.log(this.kommunKod);
    })
    
    
  }

  sendMuniciplaityCode()
  {
    this.kommunKod = this.kommunKodForm.value.kommunKod
    console.log(this.kommunKod);
    this.map = new LeafletMap('map', this.kommunKod)
  }

}
