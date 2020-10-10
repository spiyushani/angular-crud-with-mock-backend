import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CountryListComponent} from './component/country-list/country-list.component';
import {CountryDetailsComponent} from './component/country-details/country-details.component';


const routes: Routes = [
  {path: 'countries', component: CountryListComponent},
  {path: 'countries/:id', component: CountryDetailsComponent},
  {path: '**', redirectTo: '/countries'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
