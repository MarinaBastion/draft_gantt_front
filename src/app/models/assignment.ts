export class Assignment {
    constructor(id: string, 
        resource_id: string,
        value: string,
        start_date: string,
        delay: number | null,
        duration: number | null,
        mode: string | null,
        unit: string | null
        ) {
        this.id = id,
        this.resource_id = resource_id,
        this.value = value,
        this.start_date = start_date,
        this.delay = delay,
        this.duration = duration,
        this.mode = mode,
        this.unit = unit
      }
    id: string;
    resource_id: string;
    value: string;
    start_date: string;
    delay: number | null;
    duration: number | null;
    mode: string | null;
    unit: string | null;
}

export class AssignmentDto {
    constructor(
        id : string,
        resource_id: string,
        value: string,
        start_date: string,
        end_date: string | null,
        delay: number | null,
        duration: number,
        mode: string | null,
        task_id: string | null
        ) {
        this.id = id,
        this.resource_id = resource_id,
        this.value = value,
        this.start_date = start_date,
        this.delay = delay,
        this.duration = duration,
        this.mode = mode,
        this.end_date = end_date,
        this.task_id = task_id
      }
    id : string ;
    resource_id: string;
    value: string;
    start_date: string;
    end_date: string | null;
    delay: number | null;
    duration: number | null;
    mode: string | null;
    task_id: string | null;
}
export class AssignViewModel
    {
      constructor(
        id : string,
        resource_id: string,
        value: string,
        start_date: string,
        delay: number | null,
        duration: number,
        mode: string | null,
        unit: string | null,
        ) {
        this.id = id,
        this.resource_id = resource_id,
        this.value = value,
        this.start_date = start_date,
        this.delay = delay,
        this.duration = duration,
        this.mode = mode,
        this.unit = unit
      }
    id : string;
    resource_id: string;
    value: string;
    start_date: string;
    delay: number | null;
    duration: number | null;
    mode: string | null;
    unit: string | null;
}
 