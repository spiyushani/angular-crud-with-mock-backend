// Angular imports
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
// PrimeNG imports
import {TableModule} from 'primeng/table';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {RippleModule} from 'primeng/ripple';
import {ToastModule} from 'primeng/toast';
import {ToolbarModule} from 'primeng/toolbar';
import {MessageService} from 'primeng/api';
import {DialogModule} from 'primeng/dialog';
import {InputTextModule} from 'primeng/inputtext';
import {DialogService, DynamicDialogModule} from 'primeng/dynamicdialog';
import {AccordionModule} from 'primeng/accordion';
import {PanelModule} from 'primeng/panel';
// Local imports
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CountryListComponent} from './component/country-list/country-list.component';
import {CountryDetailsComponent} from './component/country-details/country-details.component';
import {CountrySaveModalComponent} from './component/country-save-modal/country-save-modal.component';
import {environment} from '../environments/environment';
import {MockModule} from './mock/mock.module';

const mockModule = environment.mockApi ? [MockModule] : [];

@NgModule({
  declarations: [
    AppComponent,
    // Country components
    CountryListComponent,
    CountryDetailsComponent,
    CountrySaveModalComponent
  ],
  imports: [
    // Config
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ...mockModule,
    // PrimeNg modules
    TableModule,
    CardModule,
    ButtonModule,
    RippleModule,
    ToastModule,
    DialogModule,
    ToolbarModule,
    InputTextModule,
    DynamicDialogModule,
    AccordionModule,
    PanelModule
  ],
  providers: [
    MessageService,
    DialogService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
