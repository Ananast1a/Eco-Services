import { WasteItemSubtype } from "../waste-item-subtype/waste-item-subtype.model";

export class WasteItem {
    label: string;
    markingName: string;
    wasteSubtypes: WasteItemSubtype[];

    constructor(label: string, markingName: string, wasteSubtypes: WasteItemSubtype[]) {
        this.label = label;
        this.markingName = markingName;
        this.wasteSubtypes = wasteSubtypes;
    }
}