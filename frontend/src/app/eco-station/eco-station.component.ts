import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import Station from 'src/shared/station';

@Component({
  selector: 'app-eco-station',
  templateUrl: './eco-station.component.html',
  styleUrls: ['./eco-station.component.scss']
})
export class EcoStationComponent implements OnInit{
  @Input() station: Station;
  @Output() addFavoriteEvent = new EventEmitter<Station>();
  @Output() removeFavoriteEvent = new EventEmitter<Station>();

  isLiked: boolean = false;

  value = 0
  ratingCount = 5

  constructor() {
    this.station = {
      id: 0,
      name: "",
      location: [0, 0],
      wastes: []
    }
  }
  
  ngOnInit(): void {
    this.value = this.station.rating;
    
  }

  onClick() {
    this.isLiked = !this.isLiked;
    if(!this.isLiked){
      this.removeFavoriteEvent.emit(this.station)
    } else{
      this.addFavoriteEvent.emit(this.station)
    }
  }

 
}
