import { Component, OnInit, Input } from '@angular/core';
import { WasteItemSubtype } from './waste-item-subtype.model';

@Component({
  selector: 'app-waste-item-subtype',
  templateUrl: './waste-item-subtype.component.html',
  styleUrls: ['./waste-item-subtype.component.scss']
})
export class WasteItemSubtypeComponent implements OnInit {
  @Input() subtype!: WasteItemSubtype;
  
  constructor() { }

  ngOnInit(): void {
  }

}
