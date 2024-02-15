import { ModuleWithProviders, NgModule } from '@angular/core';
import { ActionGroupDirective } from './components/action-group.directive';
import { ActionDirective } from './components/action.directive';

@NgModule({
  declarations: [],
  providers: [ActionDirective, ActionGroupDirective],
  exports: [],
})
export class TestModule {
  static forRoot(): ModuleWithProviders<any> {
    return {
      ngModule: TestModule,
      providers: [],
    };
  }
}
