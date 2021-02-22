export class GeoJsonMap{

    constructor(properties: GeoJsonMapProperties, geometry: GeoJsonMapGeometry)
    {
        this.properties = properties
        this.geometry = geometry
    }

    type = "Feature" as const
    properties: GeoJsonMapProperties
    

    geometry: GeoJsonMapGeometry
}

export class GeoJsonMapProperties{

    constructor(kod:string, postnummer:string, telefon:string, epost:string, namn:string, selected?:boolean)
    {
        this.kod = kod
        this.postnummer = postnummer
        this.telefon = telefon
        this.epost = epost
        this.namn = namn
        selected? this.selected = true : this.selected = false;
    }

    kod:string 
    postnummer:string 
    telefon:string 
    epost:string 
    namn:string
    selected:boolean  

}

export class GeoJsonMapGeometry{
    type = "Polygon" as const
    coordinates: Array<Array< [ longitude:number, latitude:number] >>

    constructor(coordinates: {coordinates: Array< [ longitude:number, latitude:number] > }){

        this.coordinates = this.setCoordinatesInRigthOrder(coordinates)
    }

    setCoordinatesInRigthOrder(coord: {coordinates: Array< [ longitude:number, latitude:number] > })//
    {
        let otherDirectionOrder: any[]   =  []

       // console.log("coord", coord.coordinates[0].length);
       // console.log("otherDirectionOrder 1", otherDirectionOrder)

        for(let i = coord.coordinates[0].length -1; i> -1; i--)
        {
            otherDirectionOrder.push(coord.coordinates[0][i]) 
        }
       // console.log("otherDirectionOrder 2", otherDirectionOrder)
        return [otherDirectionOrder];
    }
}

export class FeatureCollection{

    type = "FeatureCollection" as const
    features:GeoJsonMap[] 
}

