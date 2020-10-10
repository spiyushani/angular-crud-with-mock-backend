// Angular imports
import {of} from 'rxjs';
import {HttpRequest, HttpResponse} from '@angular/common/http';
// Local imports
import * as data from '../../assets/mock-data/countries.json';
import {Country} from '../model/country';

let countries: any[] = (data as any).default;

const getCountries = (request: HttpRequest<any>) => {
  return of(new HttpResponse({
    status: 200, body: countries
  }));
};

const getCountry = (request: HttpRequest<any>) => {
  const id = extractIdPathParamFromUrl(request);
  const country = countries.find(c => c.id === id);
  return of(new HttpResponse({
    status: 200, body: country
  }));
};

const extractIdPathParamFromUrl = (request: HttpRequest<any>) => {
  const requestUrl = new URL(request.url);
  return requestUrl.pathname.split('/').pop();
};

const addCountry = (request: HttpRequest<any>) => {
  const country = request.body as Country;
  countries.push(country);
  return of(new HttpResponse({
    status: 200, body: country
  }));
};

const editCountry = (request: HttpRequest<any>) => {
  const id = extractIdPathParamFromUrl(request);
  const countryIndex = countries.findIndex(c => c.id === id);
  const country = request.body as Country;
  countries[countryIndex] = country;
  return of(new HttpResponse({
    status: 200, body: country
  }));
};

const removeCountry = (request: HttpRequest<any>) => {
  const id = extractIdPathParamFromUrl(request);
  countries = countries.filter(c => c.id !== id);
  return of(new HttpResponse({
    status: 204
  }));
};

export const selectHandler = (request: HttpRequest<any>) => {
  const requestUrl = new URL(request.url);
  const getOneRegexp: RegExp = new RegExp(`/countries/[0-9a-zA-Z]+`);
  switch (request.method) {
    case 'GET':
      const pathname = requestUrl.pathname;
      if (pathname === '/countries') {
        return getCountries;
      } else if (getOneRegexp.test(pathname)) {
        return getCountry;
      } else {
        return null;
      }
    case 'POST':
      return addCountry;
    case 'PUT':
      return editCountry;
    case 'DELETE':
      return removeCountry;
    default:
      return null;
  }
};
