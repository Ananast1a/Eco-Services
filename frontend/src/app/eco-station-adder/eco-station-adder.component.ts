import { HttpClient } from '@angular/common/http';
import { Component, Input, Output, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { latLng, marker, Marker, tileLayer } from 'leaflet';
import { defaultIcon } from 'src/shared/customIcons';
import Station from 'src/shared/station';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-eco-station-adder',
  templateUrl: './eco-station-adder.component.html',
  styleUrls: ['./eco-station-adder.component.scss']
})
export class EcoStationAdderComponent implements OnInit {
  @Output() close = new EventEmitter<void>();
  station: any = {}
  user = this.authService.user.value;

  disabled:boolean = true;

  markerLayer: Marker[] = [];
  options = {
    layers: [
      tileLayer('https://api.mapbox.com/styles/v1/gergoszka/ckxc1rj1c0noj14mrolkbsqtg/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiZ2VyZ29zemthIiwiYSI6ImNrdjk5bnI5cDV0N3IybnM3Ymswanlhc3MifQ.ySglHgJ43c7Kux_j_ekPHA', {
        attribution: '&copy; OpenStreetMap contributors'
      })
    ],
    zoom: 11,
    center: latLng([ 59.960661, 30.344174])
  };

  constructor(private http: HttpClient,private authService: AuthService) { }
  @ViewChild('form', { static: true }) ngForm: NgForm;


  ngOnInit(): void {
    this.ngForm.form.valueChanges.subscribe(x => {
      console.log(Object.keys(this.station).length);
      
      if(Object.keys(this.station).length == 10){
        this.disabled = false;
      }
    })
  }

  onClick(event:any){
    this.markerLayer[0] = marker(event.latlng, {icon: defaultIcon});
    this.station.location = [event.latlng.lat, event.latlng.lng]
  }

  onClose() {
    this.close.emit();
  }

  onCreateStation() {
    console.log(this.station);
     let send_station: any = {
      "name": this.station.name,
      "address": this.station.address,
      "coordinates": this.station.location,
      "working_time": this.station.hours,
      "rating": 0,
      "types_of_waste": this.station.wastes.split(","),
      "payment_condition": this.station.payment == "Paid" ? true : false,
      "delivery_option": this.station.delivery == "Yes" ? true : false,
      "email": this.station.email,
      "phone": this.station.phone,
      "picture": this.station.image,
      "questions": []
    } 
    console.log(send_station);
    let header = {"Authorization":`JWT ${this.user.token}`}
    console.log(header);
    

    this.http.post("https://flawless-energy-335218.appspot.com/api/v1/services", send_station, {headers: header}).subscribe(res => {
      window.location.reload()      
    })
    
    
    this.close.emit();
  }

}
