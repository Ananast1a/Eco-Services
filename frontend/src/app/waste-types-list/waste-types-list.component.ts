import { Component, OnInit } from '@angular/core';
import { WasteType } from '../waste-type/waste-type.model';
import { WasteItem } from '../waste-item/waste-item.model';
import { WasteItemSubtype } from '../waste-item-subtype/waste-item-subtype.model';
import { DataStorageService } from 'src/shared/data-storage.service';

@Component({
  selector: 'app-waste-types-list',
  templateUrl: './waste-types-list.component.html',
  styleUrls: ['./waste-types-list.component.scss']
})
export class WasteTypesListComponent implements OnInit {

  wasteTypes!: WasteType[];

  constructor(private dataStorage: DataStorageService) { }

  ngOnInit(): void {
    this.wasteTypes = this.dataStorage.getWasteTypes();
  }
}
