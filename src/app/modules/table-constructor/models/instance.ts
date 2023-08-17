export class Instance {
    constructor
    (
        id : string,
        name: string,
        create_date : string,
        decsription : string,
        entity_id : string,
        parent_instance_id : string | null
    ) {
        this.id = id,
        this.entity_id = entity_id,
        this.name = name,
        this.create_date = create_date,
        this.decsription = decsription ,
        this.parent_instance_id = parent_instance_id
      }
        id : string;
        name: string;
        create_date : string;
        decsription : string;
        entity_id : string;
        parent_instance_id : string | null;
}

export class InstanceDto {
    constructor
    (
        id? : string,
        name?: string,
        create_date? : string,
        decsription? : string,
        entity_id? : string,
        parent_instance_id?: string | null | undefined
    ) {
        this.id = id,
        this.entity_id = entity_id,
        this.name = name,
        this.create_date = create_date,
        this.decsription = decsription ,
        this.parent_instance_id = parent_instance_id
      }
        id? : string;
        name?: string;
        create_date? : string;
        decsription? : string;
        entity_id? : string;
        parent_instance_id? : string | null | undefined;
}
export class InstanceModel {
  constructor
  (
      
      name: string,
      decsription : string,
      id?: string
  ) {
      this.id = id,
      this.name = name,
      this.decsription = decsription 
    }
      id? : string;
      name: string;
      decsription : string;
}