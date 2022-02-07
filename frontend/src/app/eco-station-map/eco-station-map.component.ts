import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { latLng, tileLayer, Map, LocationEvent, marker, circle, Marker, Circle, LatLng, LatLngExpression } from 'leaflet';
import { Subscription } from 'rxjs';
import Station from 'src/shared/station';
import {defaultIcon, icons} from "../../shared/customIcons"
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';

@Component({
  selector: 'app-eco-station-map',
  templateUrl: './eco-station-map.component.html',
  styleUrls: ['./eco-station-map.component.scss']
})
export class EcoStationMapComponent implements OnInit, OnDestroy {
 
  stations: Station[] = [];
  filteredStations: Station[] = [];
  
  closerThan5 : Station[] = [];
  isCloserThan5 = "5km";
  
  layers : Array<Marker> = [];
  userLayer : Array<Marker | Circle> = []
  userLocation : LatLng;
  private userSub!: Subscription;
  user: User = this.authService.user.value;
  username: string = '';
  addingMode: boolean = false;

  options = {
    layers: [
      tileLayer('https://api.mapbox.com/styles/v1/gergoszka/ckxc1rj1c0noj14mrolkbsqtg/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiZ2VyZ29zemthIiwiYSI6ImNrdjk5bnI5cDV0N3IybnM3Ymswanlhc3MifQ.ySglHgJ43c7Kux_j_ekPHA', {
        attribution: '&copy; OpenStreetMap contributors'
      })
    ],
    zoom: 11,
    center: latLng([ 59.960661, 30.344174])
  };

  constructor( private store: Store,
    private authService: AuthService) {}

  ngOnInit(): void {
    this.store.select(state => state.stations.filtered).subscribe((res: Station[])=>{
      this.stations = res; 
      this.onLocationFound().then(() => {
        this.setLayers()
      })
    })
    this.userSub = this.authService.user.subscribe(user => {
      if(user) {
        this.username = user.username;
      }
    });
  }

  onLocationFound = () => {
    this.userLocation = latLng(59.942652, 30.342346)
    this.userLayer = []

    let userMarker = marker(this.userLocation, {icon: defaultIcon})
    userMarker.bindPopup("You are here")
    
    userMarker.on('mouseover',() => {
      userMarker.openPopup();
    });
    userMarker.on('mouseout', () => {
      userMarker.closePopup();
    });

    this.userLayer.push(userMarker);
    this.userLayer.push(circle(this.userLocation,{radius: 5000, opacity: 0.3, fillOpacity: 0.1}))
    return new Promise((resolve, reject) => {
      resolve("");
    });
  }
  
  setLayers() {
    this.layers = []
    this.setFilteredStations()
   
    //Fill layer with stored services
    for(let station of this.filteredStations){

      let iconName;
      if (station.wastes.length > 1) {
        iconName = "multipleIcon"
      } else {
        iconName = station.wastes[0] + "Icon"
      }
      
      let newMarker = marker(latLng(station.location[0], station.location[1]), {
        icon: icons[iconName]
      }).bindPopup(`<h3 style="margin-bottom: 0"> ${station.name}</h3> <br> <div>Rating: ${station.rating}/5</div><div>Price: ${station.payment}</div><div>Waste accepted: ${station.wastes}</div>`)
      
      newMarker.on('mouseover',() => {
        newMarker.openPopup();
      });
      newMarker.on('mouseout', () => {
        newMarker.closePopup();
      });
      newMarker.on("click",()=>{
        document.getElementById(`service_${station.id}`).scrollIntoView({ behavior: 'smooth'})
      })
      
      this.layers.push(newMarker)
    }
  }

  setFilteredStations() {
    this.filteredStations = this.stations

    if(this.isCloserThan5 == "5km") {
      this.setCloserThan5(this.userLocation)  
      this.filteredStations = this.closerThan5;      
    } else if(this.isCloserThan5 == "all") {
      this.filteredStations = this.stations;      
    } else {
      this.filteredStations = [ {
        id: 0,
        name: "ecotaxi.spb",
        wastes: ["metal", "glass", "paper","tetrapack", "gadgets", "styrofoam", "clothing"],
        delivery: "pickup from your flat",
        rating: 4.1,
        payment: "300 RUB for 3 bags ",
        image: "https://i.ibb.co/M6rSXJr/ecotaxi.jpg",
        location: [0, 0],
        email: "ecooak@eco.com",
        phone: "+7 (812) 634-49-15"
      },]
    }
  }

  closerThan5Event(value: string){    
    this.isCloserThan5 = value;
    this.setLayers()
  }
  
  setCloserThan5(userPos: LatLng){
    this.closerThan5 = [];
    for (let station of this.stations){
      let location = station.location
      if (userPos.distanceTo(latLng(location[0], location[1])) <= 5000){
        this.closerThan5.push(station)
      };
    }    
  }

  // Locate user and move there
  // Currently disabled and view set to a constant, as none of us are in Saint Petersburg
  onMapReady(map: Map) {
    //map.on('locationfound', this.onLocationFound);
    //map.locate({setView: true, maxZoom: 16})
    map.setView(latLng(59.942652, 30.342346))
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
