import {
  Directive,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewContainerRef,
  inject,
} from '@angular/core';
import { Subject } from 'rxjs';
import { ActionGroupDirective } from './action-group.directive';

@Directive({
  standalone: true,
  selector: '[action]',
})
export class ActionDirective implements OnInit, OnDestroy {
  private readonly actionGroup = inject(ActionGroupDirective);
  readonly viewContainerRef = inject(ViewContainerRef);

  private readonly destroy$ = new Subject<void>();
  private readonly fn = (event: Event) => {
    if (!this.actionName) return;
    this.actionGroup.actionEvent$.next({
      action: this.actionName,
      $event: event,
    });
  };

  @Input({ required: true }) actionName: string | undefined;
  @Input() actionType = ['click'];

  @Output() actionEvent = new EventEmitter<Event>();

  ngOnInit(): void {
    this.actionGroup.actions.push(this);
    this.actionType.forEach((type) => {
      this.viewContainerRef.element.nativeElement.addEventListener(
        type,
        this.fn
      );
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();

    this.actionType.forEach((type) => {
      this.viewContainerRef.element.nativeElement.removeEventListener(
        type,
        this.fn
      );
    });
  }
}
