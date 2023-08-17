import { Instance } from "../modules/table-constructor/models/instance";

export interface DynamicFormValue {
    key: string;
    value: string;
    instanceId? : string;
    description?: string;      
}