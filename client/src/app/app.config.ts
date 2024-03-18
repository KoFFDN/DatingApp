import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { provideToastr } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideClientHydration(), 
    provideHttpClient(),
    provideAnimations(),
    provideToastr(),
    importProvidersFrom(
      BrowserAnimationsModule,
      CommonModule,
      BsDropdownModule.forRoot()
    )],
     // Toastr providers
};
