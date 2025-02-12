import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideStore } from '@ngrx/store';
import { convertorReducer } from './app/store/convertor.reducer';
import { provideEffects } from '@ngrx/effects';
import { ConvertorEffects } from './app/store/convertor.effects';
import { importProvidersFrom } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

bootstrapApplication(AppComponent, {
  providers: [
    provideStore({ convertor: convertorReducer }),
    provideEffects(ConvertorEffects),
    importProvidersFrom(ReactiveFormsModule)
    // provideStoreDevtools({ maxAge: 25 })
  ]
})
  .catch((err) => console.error(err));
