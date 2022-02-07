export class WasteItemSubtype {
    recyclability: string;
    description: string[];
    pictures: string[];

    constructor(recyclability: string, description: string[], pictures: string[]) {
        this.recyclability = recyclability;
        this.description = description;
        this.pictures = pictures;
    }
}