export class ProjectTypeFieldsDto {
    constructor
    (
        id: string,
        project_type_id: string,
        field_id: string,
    ) {
        this.id = id,
        this.project_type_id = project_type_id,
        this.field_id = field_id
      }
        id: string;
        project_type_id: string;
        field_id: string;        
}