import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DefaultComponent } from './default/default.component';
import { DefaultModule } from './default/default.module';

@NgModule({
  imports: [
    DefaultModule,
    RouterModule.forChild([{ path: 'home', component: DefaultComponent }]),
  ],
  exports: [DefaultModule],
})
export class LayoutsModule {
  static forRoot(): ModuleWithProviders<LayoutsModule> {
    return {
      ngModule: LayoutsModule,
      providers: [],
    };
  }
}
