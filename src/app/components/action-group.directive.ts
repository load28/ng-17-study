import {
  AfterViewInit,
  Directive,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ActionDirective } from './action.directive';

@Directive({
  standalone: true,
  selector: '[actionGroup]',
})
export class ActionGroupDirective
  implements OnInit, AfterViewInit, OnChanges, OnDestroy
{
  public readonly actionEvent$ = new Subject<{
    action: string;
    $event: Event;
  }>();
  private readonly destroy$ = new Subject<void>();

  public readonly actions: ActionDirective[] = [];

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {}

  ngAfterViewInit(): void {
    this.actionEvent$.pipe(takeUntil(this.destroy$)).subscribe({
      next: ({ action, $event }) => {
        const findedAction = this.actions?.find(
          (item) => item.actionName === action
        );

        if (
          findedAction &&
          findedAction.viewContainerRef.element.nativeElement === $event.target
        ) {
          findedAction.actionEvent.emit($event);
        }
      },
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
