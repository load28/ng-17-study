import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';

interface View {
  userId: string;
}

@Component({
  selector: 'app-test-store',
  standalone: true,
  imports: [CommonModule],
  template: ` {{ userIdSignal() }} `,
  styleUrls: ['./store-test.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ComponentStore],
})
export class StoreTestComponent {
  private readonly vm = inject(ComponentStore<View>);

  userIdSignal = this.vm.selectSignal(({ userId }) => userId);

  constructor() {
    this.vm.setState({ userId: '1' });
  }
}
