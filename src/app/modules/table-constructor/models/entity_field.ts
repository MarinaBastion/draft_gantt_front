export class EntityField {
    constructor
    (
        id: string, 
        entity_id: string,
        field_id: string  
    ) {
        this.id = id,
        this.entity_id = entity_id,
        this.field_id = field_id
      }
      id: string; 
      entity_id: string;
      field_id: string ; 
}

export class EntityFieldDto {
    constructor
    (
        id: string, 
        entity_id: string,
        field_id: string  
    ) {
        this.id = id,
        this.entity_id = entity_id,
        this.field_id = field_id
      }
      id: string; 
      entity_id: string;
      field_id: string ; 
}