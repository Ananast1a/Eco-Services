import { Component, OnInit, Input } from '@angular/core';
import { WasteType } from './waste-type.model';

@Component({
  selector: 'app-waste-type',
  templateUrl: './waste-type.component.html',
  styleUrls: ['./waste-type.component.scss']
})
export class WasteTypeComponent implements OnInit {
  @Input() wasteType!: WasteType;
  extended: boolean;

  constructor() { }

  ngOnInit(): void {
    this.extended = false;
  }

  switchExtension() {
    this.extended = !this.extended;
  }

}
