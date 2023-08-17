export class FormField<T> {
    value?: T;
    key: string;
    label: string;
    required: boolean;
    validator: string;
    order: number;
    controlType: string;
    type: string;
    entity_id?: string;
    options: { key: string; value: T }[];
  
    constructor(
      options: {
        value?: T;
        key?: string;
        label?: string;
        required?: boolean;
        validator?: string;
        order?: number;
        controlType?: string;
        type?: string;
        entity_id?: string;
        options?: { key: string; value: T }[];
      } = {}
    ) {
      this.value = options.value;
      this.key = options.key || "";
      this.label = options.label || "";
      this.required = !!options.required;
      this.validator = options.validator || "";
      this.order = options.order === undefined ? 1 : options.order;
      this.controlType = options.controlType || "";
      this.type = options.type || "";
      this.entity_id = options.entity_id || "";
      this.options = options.options || [];
    }
  }