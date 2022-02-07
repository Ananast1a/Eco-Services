import { Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngxs/store';
import Station from 'src/shared/station';
import { SetFilteredStations } from '../store/actions/actions';

@Component({
  selector: 'app-eco-station-sidebar',
  templateUrl: './eco-station-sidebar.component.html',
  styleUrls: ['./eco-station-sidebar.component.scss'] 
})
export class EcoStationSidebarComponent implements OnInit,OnChanges {
  @Input() stations: any[] = [];
  @Output() closerThan5Event = new EventEmitter<string>();
  allStations: any[] = [];
  showStations : Station [];
  private _favoriteStations : Station[] = [];

  get favoriteStations(): Station[] {
    return this._favoriteStations;
  }
  set favoriteStations(value: Station[]) {
      console.log(value);
          
      if (value !== this._favoriteStations) {
          this._favoriteStations = value;
      }
  }

  display: string = "none";
  filterArray: any = []

  searchForm!: FormGroup;
  filterForm! :FormGroup;
  showServicesForm! : FormGroup;

  toggleForm = new FormGroup({
    toggleServices: new FormControl('5km')
  });
  toggle = ""
 
  constructor(private store: Store) {
    this.showStations = this.stations
  }

  ngOnInit(): void {
    this.store.select(state => state.stations.stations).subscribe((res: Station[])=>{
      this.allStations = res;      
    })
    this.searchForm = new FormGroup({
      'searchQuery': new FormControl(""),
    });
    this.filterForm = new FormGroup({
      'wastes' : new FormArray([]),
      'delivery' : new FormArray([]),
      'rating' : new FormArray([]),
      'payment' : new FormArray([]),
      'hours' : new FormArray([]),
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.stations.currentValue.length != 0){
      this.renderAllFilters()      
    }
    this.showStations = this.stations;
    let nonFav = this.stations.filter(station => !this.favoriteStations.includes(station))
    console.log(nonFav);
  }

  addFavorite(station: Station){
    this.favoriteStations.push(station)
    this.calculateFavorite()
  }

  removeFavorite(station: any){
    this.favoriteStations.splice(this.favoriteStations.indexOf(station), 1);
    this.calculateFavorite()
  }

  calculateFavorite(){
    let nonFav = this.stations.filter(station => !this.favoriteStations.includes(station))
    this.showStations = this.favoriteStations.concat(nonFav)
  }

  changeToggle(e:any) {
    this.toggle = e.target.value;    
    this.closerThan5Event.emit(this.toggle)
  }
  
  onSubmit(){
    let value = this.searchForm.value.searchQuery.toLowerCase()
    let queryedStations = []
    for (let station of this.allStations){
      if(station.name.toLowerCase().match(value) || station.address!.toLowerCase().match(value)){
        queryedStations.push(station)        
      }
    }
    
    if(value){
      this.store.dispatch(new SetFilteredStations(queryedStations))
    } else {
      this.store.dispatch(new SetFilteredStations(this.allStations))
    }
  }

  onFilter(){
    let index = 0;
    let res:any =[]
    let isEmpty = true;

    for(let controls in this.filterForm.controls) {
      let formArray = this.filterForm.controls[controls] as FormArray
      let isFilterOnArray = []
      
      for (let value of formArray.value){
        if (value){
          isEmpty = false;
        }
        isFilterOnArray.push(value)
      }
      
      for (let i in isFilterOnArray){
        if (isFilterOnArray[i]){
          res.push(this.filterArray[index].value[i])
        }
      }
      index++;
    }
    type tplotOptions = {
      [key: string]: boolean
  }
    let filterNames: string[] = ["wastes","delivery","rating","payment","hours"]
    
    let filteredStations = []
    for(let station of this.allStations) {
      let stationArray: string[] = []
      for(let name of filterNames){
        stationArray = stationArray.concat(station[name])
      }
      
      if(res.every((r:any)=> stationArray.includes(r))){
        filteredStations.push(station)
      }
    
    }
    
    if(isEmpty){
      console.log("ran");
      this.store.dispatch(new SetFilteredStations(this.allStations))
    } else {
      this.store.dispatch(new SetFilteredStations(filteredStations))
    }
  }

  renderAllFilters() {
    this.filterArray = []
    let filterNames: string[] = ["wastes","delivery","rating","payment","hours"]
    for(let name of filterNames){
      let filterValues: string[] = []
      for(let station of this.allStations) {        
        filterValues = filterValues.concat(station[name])
      }
      
      let filterObject = {"name": name, "value": [...new Set(filterValues.sort())]}
      for (let val of filterObject.value){
        let formArray = this.filterForm.get(name) as FormArray;
        formArray.push(new FormControl(false))
      }
      this.filterArray.push(filterObject)
    }
  }

  showFilter(){
    this.display = this.display == "none" ? "flex" : "none";
  }
}
