import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';
import Station from 'src/shared/station';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-eco-station-page',
  templateUrl: './eco-station-page.component.html',
  styleUrls: ['./eco-station-page.component.scss']
})
export class EcoStationPageComponent implements OnInit {
  isAuthenticated = false;
  private userSub!: Subscription;
  user = this.authService.user.value;
  username = ""

  id: string;
  station: Station ={
    id:0,
    name: "",
    wastes: [],
    location: []
  };
  ratingCount = 5;
  value: number = 0;
  disabled = false
  styles: any = {"fontSize": "34px", "margin": "10px", "cursor" : "default"};
  rated :any;

  questions: any = []
  question = ""
  anwserForm =  new FormGroup({

  });
  usernames: any = []

  onSubmit(){
    let headers = {"Authorization":`JWT ${this.user.token}`}
    this.http.post("https://flawless-energy-335218.appspot.com/api/v1/questions",{ "service_id": this.id,
    "question_text": this.question}, {headers}).subscribe(res => {
      this.http.get(`https://flawless-energy-335218.appspot.com/api/v1/questions/service/${this.id}`).subscribe(res => {
        
        this.questions = res;
        this.question = "";
      })
    })
  }

  onSubmitAnwser(){
    console.log("ran");
    let headers = {"Authorization":`JWT ${this.user.token}`}

    let controls =  this.anwserForm.controls;
    for (let i in controls) {
      if(controls[i].value){
        console.log(i + ": " + controls[i].value);
        this.http.patch(`https://flawless-energy-335218.appspot.com/api/v1/questions/${i}`,{answer_text: controls[i].value},{headers}).subscribe(res =>{
          window.location.reload()
        })
      }
    }
  }

  starClick(){
    this.disabled = true;

    if(!this.user){
      alert("You are not logged in")
    }
    
    if(!this.rated){
     
      let old = JSON.parse(localStorage.getItem("rated"));
      if(old === null) old = {};
      old[this.id] = this.value
      localStorage.setItem("rated", JSON.stringify(old) )


      let headers = {"Authorization":`JWT ${this.user.token}`}
      console.log(headers);
      
   
      this.http.put(`https://flawless-energy-335218.appspot.com/api/v1/ratings/${this.id}`,{rating: this.value},{headers}).subscribe(res =>{
        console.log(res);
      })
    }
  }

  constructor(private route: ActivatedRoute, private http: HttpClient,private authService: AuthService) {
    http.get("https://flawless-energy-335218.appspot.com/api/v1/ratings/all").subscribe(()=>{
      this.route.params.subscribe( params => {
        http.get(`https://flawless-energy-335218.appspot.com/api/v1/services/${params.id}`).subscribe((station: any) => {
          this.station = {
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

          this.id = params.id;
          let storageRated = JSON.parse(localStorage.getItem("rated"))
        
          if(storageRated[this.id]){
            this.rated = storageRated[this.id]
            
            this.value = Number(this.rated)
            this.disabled = true;
          }
        })
        http.get(`https://flawless-energy-335218.appspot.com/api/v1/questions/service/${params.id}`).subscribe(res => {
          this.questions = res;
          
          for (let _question of this.questions) {
            this.anwserForm.addControl(_question.question_id,new FormControl(""))
            http.get(`https://flawless-energy-335218.appspot.com/api/v1/users/${_question.user_id}`).subscribe((res: any) => {              
            this.usernames.push(res.username)
            })            
          }
          
        })
      });
    })
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
      if(!user) {
        this.disabled = true
        this.styles["cursor"] = "default";
      }
    });
  }

  ngOnInit(): void {
    this.username = this.user.username
  }

}
