// Angular imports
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
// Local imports
import {Country} from '../model/country';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private baseUrl = 'http://localhost:8000/countries';

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Country[]> {
    return this.http.get<any>(this.baseUrl);
  }

  get(id: string): Observable<Country> {
    return this.http.get<any>(this.baseUrl + '/' + id);
  }

  create(country: Country) {
    return this.http.post<any>(this.baseUrl, country);
  }

  update(id: string, country: Country): Observable<Country> {
    return this.http.put<any>(this.baseUrl + '/' + id, country);
  }

  delete(id: string) {
    return this.http.delete<any>(this.baseUrl + '/' + id);
  }
}
