import {TypeField,TypeFieldto} from "./type";

export class TaskValueDto {
    constructor
    (
        id: string, 
        field_id: string,
        task_id: string,
        text_data : string | null ,
        numeric_data : number | null,
        bool_data : boolean | null,
        instance_id  : string | null,
        value_id : string | null


    ) {
        this.id = id,
        this.field_id = field_id,
        this.task_id = task_id,
        this.text_data = text_data
        this.numeric_data = numeric_data,
        this.bool_data =  bool_data,
        this.instance_id = instance_id,
        this.value_id = value_id
      }
        id: string;
        field_id: string;
        task_id: string;
        text_data : string | null ;
        numeric_data : number | null;
        bool_data : boolean | null;
        instance_id  : string | null;
        value_id : string | null;

}

export class TaskValueView {
  constructor
  (
    field : string,
    value : string,
    type: TypeFieldto
  )
  {
        this.field = field,
        this.value = value,
        this.type = type
  }
    field : string;
    value : string;
    type: TypeFieldto;
}