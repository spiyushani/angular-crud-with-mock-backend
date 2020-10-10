// Angular imports
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
// Local imports
import {CountryService} from '../../service/country.service';
import {Country} from '../../model/country';

@Component({
  selector: 'app-country-details',
  templateUrl: './country-details.component.html',
  styleUrls: ['./country-details.component.scss']
})
export class CountryDetailsComponent implements OnInit {
  country: Country;
  goBackUrl = '..';

  constructor(private countryService: CountryService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    const name: string = this.route.snapshot.paramMap.get('id');
    this.countryService.get(name).subscribe(data => this.country = data);
  }
}
