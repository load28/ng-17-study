import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonComponent } from './components/button/button.component';
import { ItemComponent, ListComponent } from './components/list/list.component';
import { OnPushComponent } from './components/on-push/on-push.component';
import { StoreTestComponent } from './components/store/store-test.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    ButtonComponent,
    ListComponent,
    ItemComponent,
    OnPushComponent,
    StoreTestComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  title = 'ng-17';
  flag = false;

  @ViewChildren(ButtonComponent) buttons:
    | QueryList<ButtonComponent>
    | undefined;

  constructor() {}

  ngAfterViewInit(): void {
    const heights = this.buttons?.map((button) => {
      return button.height();
    });

    console.log(heights);
  }

  onClickedButton() {
    console.log('button clicked');
  }
}
