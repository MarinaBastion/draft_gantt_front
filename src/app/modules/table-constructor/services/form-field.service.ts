import { Injectable } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { of } from 'rxjs';
import { FormField } from '../models/form-field';

@Injectable({
  providedIn: 'root'
})
export class FormFieldService {

  constructor() { }
  
  toFormGroup(inputs: FormField<string>[]): FormGroup {
    const group: any = {};
    inputs.forEach(input => {
      let validator: ValidatorFn[] = [];
      if (!(input.type == "boolean"))
     {
      validator = input.required ? [Validators.required] : [];
      }
      switch (input.type) {
        case "numeric":
          validator.push(Validators.pattern("^[0-9]*$"));
          break;
        case "numeric(20,6)":
          validator.push(Validators.pattern("^\\d{0,20}\.?\\d{0,4}$"));
          break;
        default:
          break;
      }
      group[input.key] = validator.length > 0 ? new FormControl(input.value || '', validator)
                                        : new FormControl(input.value || '');
    });

    return new FormGroup(group);
  }

}