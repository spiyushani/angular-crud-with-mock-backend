// Angular imports
import {Component, Input} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
// PrimeNG imports
import {PrimeNGConfig} from 'primeng/api';
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
// Local imports
import {Country} from '../../model/country';

@Component({
  selector: 'country-save-modal',
  templateUrl: './country-save-modal.component.html',
  styleUrls: ['./country-save-modal.component.scss']
})
export class CountrySaveModalComponent {
  @Input() showDialog: boolean;
  @Input() header: string;
  country: Country;
  countryForm: FormGroup;

  constructor(private primengConfig: PrimeNGConfig, public ref: DynamicDialogRef, public config: DynamicDialogConfig) {
    this.country = this.config.data.country;
    this.countryForm = new FormGroup({
      id: new FormControl({value: this.country.id, disabled: this.country.id != null}, [Validators.required]),
      name: new FormControl(this.country.name, [Validators.required]),
      capital: new FormControl(this.country.capital, [Validators.required]),
    });
    this.primengConfig.ripple = true;
  }

  onSubmit() {
    this.formValuesToCountry();
    this.ref.close(this.country);
  }

  hideDialog() {
    this.ref.close(null);
  }

  formValuesToCountry() {
    this.country = this.countryForm.getRawValue();
  }

}
