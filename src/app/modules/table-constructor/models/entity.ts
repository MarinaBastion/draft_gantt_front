export class Entity {
    constructor
    (
        id: string, 
        create_date: string,
        decsription: string,
        name : string   
    ) {
        this.id = id,
        this.create_date = create_date,
        this.name = name,
        this.decsription = decsription
      }
      id: string; 
      create_date: string;
      decsription: string;
      name : string 
}

export class EntityDto {
    constructor
    (
        id: string, 
        create_date: string,
        decsription: string,
        name : string   
    ) {
        this.id = id,
        this.create_date = create_date,
        this.name = name,
        this.decsription = decsription
      }
      id: string; 
      create_date: string;
      decsription: string;
      name : string 
}