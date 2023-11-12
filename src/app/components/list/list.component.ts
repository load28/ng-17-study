import {
  AfterViewInit,
  Component,
  Injectable,
  InjectionToken,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
  ViewContainerRef,
  inject,
} from '@angular/core';

const itemToken = new InjectionToken<string>('item');

enum Category {
  ME = 'me',
  ALL = 'all',
}

@Injectable()
export class Item {
  category: Category | undefined;

  setCategory(category: Category) {
    this.category = category;
  }
}

@Component({
  standalone: true,
  selector: 'app-item',
  template: ` <li>item</li> `,
  providers: [{ provide: itemToken, useClass: ItemComponent }, Item],
})
export class ItemComponent {
  baseItem = inject(Item);
  constructor() {
    this.baseItem.setCategory(Category.ALL);
  }
}

@Component({
  standalone: true,
  selector: 'app-me-item',
  template: ` <li>me</li> `,
  providers: [{ provide: itemToken, useClass: MeItemComponent }, Item],
})
export class MeItemComponent {
  baseItem = inject(Item);
  constructor() {
    this.baseItem.setCategory(Category.ME);
  }
}

@Component({
  standalone: true,
  selector: 'app-dynamic-item',
  template: ` <li>dynamic</li> `,
})
export class DynamicItemComponent {}

@Component({
  standalone: true,
  selector: 'app-list',
  template: `
    <button type="button" #greeting>Hello!</button>
    <ul>
      <app-me-item></app-me-item>
      <app-item></app-item>
      @defer (on interaction(greeting)) {
      <app-me-item></app-me-item>
      }
      <ng-template #dynamicContent></ng-template>
    </ul>
  `,
  imports: [ItemComponent, MeItemComponent],
})
export class ListComponent implements OnInit, AfterViewInit {
  @ViewChild('dynamicContent', { read: ViewContainerRef }) dynamicContent:
    | ViewContainerRef
    | undefined;
  @ViewChildren(itemToken) views:
    | QueryList<ItemComponent | MeItemComponent>
    | undefined;

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.dynamicContent?.createComponent(DynamicItemComponent);

    this.views?.forEach((view) => {
      console.log(view.baseItem.category);
    });

    this.views?.changes.subscribe((views) => {
      console.log(
        views.map(
          (view: ItemComponent | MeItemComponent) => view.baseItem.category
        )
      );
    });
  }
}
