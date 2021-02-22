import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as Leaflet from 'leaflet';
import { kommmunergeo } from '../../assets/map/kommunergeo';

const stockholm = {
    coords: new Leaflet.LatLng(59.3392560, 17.9914),//62.39129, 17.3063
    zoom: 9 
}

export class LeafletMap {
    map:Leaflet.Map;
    kommunKod:string = "0162"
    kommuner:kommmunergeo = new kommmunergeo(this.kommunKod);
    

    geojsonFeature = {
        "type": "Feature" as const, 
        "properties": {
            "name": "Coors Field",
            "amenity": "Baseball Stadium",
            "popupContent": "This is where the Rockies play!"
        },
        "geometry": {
            "type": "point" as const,
            "coordinates": [17, 62]
        }
    };

    geoJsonPoly = {
        "type": "Feature" as const,
                    "properties": {
                        "kod": "1440",
                        "postnummer": "44980",
                        "telefon": "0303-330000",
                        "epost": "kommun@ale.se",
                        "namn": "Ale kommun"
                    },
                    "geometry": {
                       "type": "Polygon" as const,
                        "coordinates": [
                        [
                          [12.37511384238, 58.11508613311],                   
                         [12.35020696699, 58.10697317331], 
                          [12.39092963608, 58.10816346254],
                           [12.37511384238, 58.11508613311]
                            
                            
                           
                        ]
                        ]
                       
                    }
                   }

    

    constructor( id:string)
    {
        this.map = Leaflet.map(id);
        Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')
            .addTo(this.map);

        
        // console.log("this.kommuner.transformToGeoJson()[0]", this.kommuner.transformToGeoJson()[1])
        // console.log("this.kommuner.kommuner[0]", this.kommuner.kommuner[0])
        // console.log("this.geoJsonPoly", this.geoJsonPoly)
         Leaflet.geoJSON( /*this.geoJsonPoly*/ this.kommuner.transformToGeoJson(),{
            style:{
                fillColor:'green',
                weight: 0.2,
                // opacity:1
                fillOpacity:0.0
            },
            onEachFeature: this.onEachFeature 
         }).addTo(this.map);//this.kommuner.kommuner

            //59.334591, 18.063240
            this.map.setView(this.kommuner.kommunCenter().coords, stockholm.zoom);

        // let circle = Leaflet.circle(this.kommuner.kommunCenter().coords,{//12.37511384238, 58.11508613311
        //     color:'red',
        //     fillColor:'blue',
        //     opacity:0.1,
        //     radius:30000
        // }).addTo(this.map);

        let polygon = Leaflet.polygon(
            [
                // [59.334591, 18],
                // [63, 20],
                // [59.334591, 17],
                 this.kommuner.kommunerGeoJson()
                
            ],
            {
                color:'red',
                fillColor:'green',
                // opacity:1
                fillOpacity:0.3
            }
            
        ).on({

            mouseover: this.highlightFeature,
            mouseout: this.resetHighlight,
            click: this.clickOnMap
            
        }).addTo(this.map);

        // this.kommuner.grannKommuner()
        //console.log(this.kommuner.grannKommuner())
            
    }

    highlightFeature(e) {
        var layer = e.target;
    
        layer.setStyle({
            weight: 5,
            color: '#666',
            dashArray: '',
            fillOpacity: 0.7
        });
    
        if (!Leaflet.Browser.ie && !Leaflet.Browser.opera && !Leaflet.Browser.edge) {
            layer.bringToFront();
        }
    }

    resetHighlight(e) {
        let layer = e.target;
    
        layer.setStyle({
            color:'red',
            fillColor:'green',
            // weight: 5,
            // color: 'blue',
            // dashArray: '',
             fillOpacity: 0.3
        });
    }

    clickOnMap(e)
    {
        let layer = e.target;

        layer.setStyle({
            color:'red',
            fillColor:'green',
            fillOpacity:0
        });

    }

    onEachFeature(feature, layer) {
        layer.on({
             mouseover: () => {
                layer.setStyle({
                    fillOpacity: 0.5,
                    weight: 2
                })

             } ,//this.highlightFeature,
             mouseout: () =>{
                 console.log(layer);
                 if(!layer.options.selected)
                 {
                    layer.setStyle({
                        fillColor:'green',
                        weight: 0.2,
                        fillOpacity:0.0
                 })

                 }
                 
             }, //this.resetHighlight,
             click: (e) => {
                 console.log("feature", feature)
                 console.log("layer", layer.options.style)
                 layer.options.style.fillCollor = "red"
                 console.log("e", e.target.options.style)
                 layer.options.selected = !layer.options.selected
                 if(layer.options.selected)
                 {
                    
                    layer.setStyle({
                        fillOpacity: 0.5,
                        weight: 2
                        })
                 }
                 else
                 {
                    
                    layer.setStyle({
                        fillColor:'green',
                        weight: 0.2,
                        fillOpacity:0.0
                        })

                 }
                
             }
        });
    }

    grannKommuner()
    {
        
        let polygon = Leaflet.polygon(
            [
                // [59.334591, 18],
                // [63, 20],
                // [59.334591, 17],
               // this.kommuner.grannKommuner()
                
            ],
            {
                color:'red',
                fillColor:'green',
                // opacity:1
                fillOpacity:0.3
            }).on({

            mouseover: this.highlightFeature,
            mouseout: this.resetHighlight,
            click: this.clickOnMap
            
        }).addTo(this.map);

    }


}