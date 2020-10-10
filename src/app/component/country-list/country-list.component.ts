// Angular imports
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
// PrimeNG imports
import {MessageService, PrimeNGConfig} from 'primeng/api';
import {DialogService, DynamicDialogRef} from 'primeng/dynamicdialog';
// Local imports
import {Country} from '../../model/country';
import {CountryService} from '../../service/country.service';
import {CountrySaveModalComponent} from '../country-save-modal/country-save-modal.component';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.scss']
})
export class CountryListComponent implements OnInit {
  countries: Country[];
  selectedCountry: Country;

  constructor(private countryService: CountryService, private router: Router, private primengConfig: PrimeNGConfig, private messageService: MessageService, public dialogService: DialogService) {
  }

  ngOnInit() {
    this.loadAll();
    this.primengConfig.ripple = true;
  }

  private loadAll() {
    this.countryService.getAll().subscribe(data => this.countries = data);
  }

  onRowSelect($event: any) {
    this.router.navigate(['countries', $event.data.id]);
  }

  deleteCountry(country: Country) {
    this.countryService.delete(country.id).subscribe(() => {
      this.loadAll();
      this.messageService.add({severity: 'success', summary: 'Success', detail: 'Country deleted'});
    });
  }

  openCreateModal() {
    const ref = this.openModal(new Country(), 'Add country');
    ref.onClose.subscribe((country: Country) => {
      if (country) {
        this.countryService.create(country).subscribe(() => {
          this.messageService.add({severity: 'success', summary: 'Success', detail: 'Country created'});
        }, er => {
          this.messageService.add({severity: 'error', summary: 'Failure', detail: 'Unable to add country'});
        });
      }
    });
  }

  openEditModal(selectedCountry: Country) {
    const ref = this.openModal(selectedCountry, 'Edit country');
    ref.onClose.subscribe((country: Country) => {
      if (country) {
        this.countryService.update(country.id, country).subscribe(() => {
          this.messageService.add({severity: 'success', summary: 'Success', detail: 'Country updated'});
        });
      }
    });
  }

  openModal(country: Country, header: string): DynamicDialogRef {
    return this.dialogService.open(CountrySaveModalComponent, {
      data: {country},
      header,
      contentStyle: {'max-height': '500px', 'overflow': 'auto'},
      baseZIndex: 10000
    });
  }
}
