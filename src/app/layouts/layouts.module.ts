import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { DefaultModule } from './default/default.module';

@NgModule({
  imports: [
    DefaultModule
  ],
  exports: [
    DefaultModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class LayoutsModule { }
