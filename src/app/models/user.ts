export class User {
    constructor(id: string, 
        text: string,
        parent: string | null,
        unit: string | null
        ) {
        this.id = id,
        this.text = text,
        this.parent = parent,
        this.unit = unit
      }
    id: string;
    text: string;
    parent: string | null;
    unit: string | null;
}