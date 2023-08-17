import {TypeField,TypeFieldto} from "./type";

export class Field {
    constructor
    (
        id: string, 
        create_date: string,
        decsription: string,
        name : string ,
        type: TypeField  
    ) {
        this.id = id,
        this.create_date = create_date,
        this.name = name,
        this.decsription = decsription,
        this.type = type
      }
      id: string; 
      create_date: string;
      decsription: string;
      name : string ;
      type: TypeField ;
}

export class FieldDto {
    constructor
    (
        id: string, 
        create_date: string,
        decsription: string,
        name : string ,
        type: TypeFieldto  
    ) {
        this.id = id,
        this.create_date = create_date,
        this.name = name,
        this.decsription = decsription,
        this.type = type
      }
      id: string; 
      create_date: string;
      decsription: string;
      name : string ;
      type: TypeFieldto ;
}
