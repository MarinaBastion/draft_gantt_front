
export enum DataTypes {
    String = "string",
    Integer = "integer",
    Double = "numeric",
    Boolean = "boolean",
    Currency = "numeric(20,6)",
    Entity = "entity_id",
    DateTime = "timestamp"
  }
  export interface CnstructorTable {
    name: string;
    url: string;
    children?: CnstructorTable[];
  }
  export const TREE_CONSTRUCTOR: CnstructorTable[] = [
    {
      name: 'Конструктор', url: '',
      children: [{name: 'Сущности',url:'tableConstructor'}, {name: 'Поля',url:'tableConstructor/fieldConstructor'},{name: 'Привязка полей', url: 'tableConstructor/entityFieldConstructor'}, {name: 'Справочники',url:'tableConstructor/valueConstructor'}],
    } ,
    {
      name: 'Конструктор проектов', url: '',
      children: [{name: 'Типы проектов',url:'projectTypes'}, {name: 'Поля для типов проекта',url:'projectTypes/projectFieldsConstructor'}]
    }
  ];
  export const TREE_PROJECT_FIELD: CnstructorTable[] = [
    {
      name: 'Конструктор проектов', url: '',
      children: [{name: 'Типы проектов',url:'projectFieldsConstructor'}, {name: 'Поля для типов проекта',url:'projectTypes/projectFieldsConstructor'}],
    }
  ];

  export interface FlatNode {
    expandable: boolean;
    name: string;
    url: string;
    level: number;
  }
  