
export class Value {
    constructor
    (
        id: string, 
        field_id: string,
        instance_id: string,
        text_data : string | null ,
        numeric_data : number | null,
        bool_data : boolean | null,
        parent_value_id : string | null,
        value_instance_id  : string | null,



    ) {
        this.id = id,
        this.field_id = field_id,
        this.instance_id = instance_id,
        this.text_data = text_data
        this.numeric_data = numeric_data,
        this.bool_data =  bool_data,
        this.parent_value_id = parent_value_id,
        this.value_instance_id = value_instance_id
      }
        id: string;
        field_id: string;
        instance_id: string;
        text_data : string | null ;
        numeric_data : number | null;
        bool_data : boolean | null;
        parent_value_id : string | null;
        value_instance_id  : string | null;
}

export class ValueDto {
    constructor
    (
        id: string, 
        field_id: string,
        instance_id: string,
        text_data : string | null ,
        numeric_data : number | null,
        bool_data : boolean | null,
        parent_value_id : string | null,
        value_instance_id  : string | null


    ) {
        this.id = id,
        this.field_id = field_id,
        this.instance_id = instance_id,
        this.text_data = text_data
        this.numeric_data = numeric_data,
        this.bool_data =  bool_data,
        this.parent_value_id = parent_value_id,
        this.value_instance_id = value_instance_id
      }
        id: string;
        field_id: string;
        instance_id: string;
        text_data : string | null ;
        numeric_data : number | null;
        bool_data : boolean | null;
        parent_value_id : string | null;
        value_instance_id  : string | null;
}