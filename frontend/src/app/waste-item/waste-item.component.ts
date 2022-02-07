import { Component, OnInit, Input } from '@angular/core';
import { WasteItem } from './waste-item.model';

@Component({
  selector: 'app-waste-item',
  templateUrl: './waste-item.component.html',
  styleUrls: ['./waste-item.component.scss']
})
export class WasteItemComponent implements OnInit {
  @Input() wasteItem!: WasteItem;
  constructor() { }

  ngOnInit(): void {
  }

}
