import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import Station from 'src/shared/station';
import { AuthService } from './auth/auth.service';
import { SetStations } from './store/actions/actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'nearby-eco';

  stations: Station[] = []

  constructor( private store: Store, private http: HttpClient, private authService: AuthService){}

  ngOnInit(): void {
     this.http.get("https://flawless-energy-335218.appspot.com/api/v1/services").subscribe((res:any) => {
       for (let station of res){
        let newStation :Station ={
          id: station.service_id,
          name: station.name,
          address: station.address,
          wastes: station.types_of_waste,
          delivery: station.delivery_option ? "Yes": "No",
          rating: station.rating,
          payment: station.payment_condition ? "Paid" : "Free",
          hours: station.working_time,
          image: station.picture,
          location: station.coordinates,
          email: station.email,
          phone: station.phone
        }
        this.stations.push(newStation)
       }
       this.store.dispatch(new SetStations(this.stations))
     })
     this.authService.autoLogin();  
  }
}
