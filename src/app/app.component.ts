import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, ValidatorFn } from '@angular/forms';
import { SirenService } from 'src/services/siren.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SirenValidity';
  form = this.fb.group({
    sirenNumber: ['', {
      validators: [

        this.sirenNumberValidator()
      ],

    }],

  });

  constructor(private sirenService: SirenService, private fb: FormBuilder) {
  }
  get sirenNumber() {
    return this.form.controls['sirenNumber'];
  }
  get sirenWithoutControlNumber() {
    return this.sirenService.ComputeFullSiren(this.sirenNumber.value.toString());
  }

  sirenNumberValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {

      const value = control.value;

      if (!value) {
        return { sirenNumberValid: false };
      }

      const sirenValid = this.sirenService.CheckSirenValidity(value.toString())
      return !sirenValid ? { sirenNumberValid: true } : null;
    }
  }
}

