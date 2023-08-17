export class ProjectTypeDto {
    constructor
    (
        id: string,
        name: string,
        create_date: string,
        decsription: string
    ) {
        this.id = id,
        this.name = name,
        this.create_date = create_date,
        this.decsription = decsription
      }
        id: string;
        name: string;
        create_date: string;
        decsription: string;
}

