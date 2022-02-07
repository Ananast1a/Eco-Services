import { WasteItem } from "../waste-item/waste-item.model";

export class WasteType {
    public title: string;
    public wasteItems: WasteItem[];
    public recommendation: string;

    constructor(title: string, wasteItems: WasteItem[], recom: string) {
        this.title = title;
        this.wasteItems = wasteItems;
        this.recommendation = recom;
    }
}