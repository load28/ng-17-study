import {
  AfterRenderPhase,
  Component,
  EventEmitter,
  Output,
  ViewContainerRef,
  WritableSignal,
  afterNextRender,
  signal,
} from '@angular/core';
import { fromEvent } from 'rxjs';
import { cleanUpUser } from '../../misc/clean-up-user';

@Component({
  standalone: true,
  selector: 'button[app-button]',
  template: `@if(height()) { click me }`,
})
export class ButtonComponent {
  height: WritableSignal<undefined | string> = signal(undefined);

  @Output() clickedButton = new EventEmitter();

  constructor(private readonly viewContainerRef: ViewContainerRef) {
    console.log(this.viewContainerRef.element.nativeElement);
    fromEvent(this.viewContainerRef.element.nativeElement, 'click').subscribe(
      () => {
        this.clickedButton.emit();
      }
    );

    cleanUpUser();

    afterNextRender(
      () => {
        console.log('read phase', document.body.style.height);
        this.height.set(document.body.style.height);
      },
      { phase: AfterRenderPhase.Read }
    );

    afterNextRender(
      () => {
        console.log('write phase');
        document.body.style.height = '600px';
      },
      { phase: AfterRenderPhase.Write }
    );
  }
}
