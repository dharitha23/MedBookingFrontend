import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
  if (performance.navigation.type === 1) {
    console.log( "This page is reloaded" );
  } else {
    console.log( "This page is not reloaded");
    localStorage.clear();
  }
 
