import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ActionGroupDirective } from '../action-group.directive';
import { ActionDirective } from '../action.directive';

@Component({
  selector: 'app-on-push',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ActionGroupDirective, ActionDirective],
  template: `
    <button type="button" (click)="onView()">view</button>
    @if(flag) {
    <div>flag is true</div>
    } @if(flagSignal()) {
    <div>flagSignal is true</div>
    }
    <input type="text" value="2" />

    <div actionGroup>
      <button action="a" [actionName]="'asdfd'">a</button>
    </div>
  `,
})
export class OnPushComponent {
  flag = false;
  flagSignal = signal(false);

  constructor() {
    setTimeout(() => {
      this.flag = true;
      this.flagSignal.set(true);
    }, 3000);
  }

  onView() {
    this.flag = true;
  }
}
