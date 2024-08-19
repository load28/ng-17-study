import { CommonModule } from '@angular/common';
import { Component, inject, Injectable } from '@angular/core';
import { RouterOutlet } from '@angular/router';

/**
 * 구현하는 기능
 * 1. 유저에게 셔츠를 주문 받는다.
 * 2. 무료 증정 셔츠를 줄 수 있되 색상은 고르거나 가장 적게 팔린 색상을 준다.
 */

type OrderData = { date: string; shirtColor: ShirtColor; amount: number };
type UserId = string;

type OrderParams = {
  type: 'Order';
  date: {
    userId: UserId;
    shirtColor: ShirtColor;
    amount: number;
  };
};

type UpdateOrderParams = {
  type: 'UpdateOrder';
  date: {
    date: string;
    userId: UserId;
    shirtColor: ShirtColor;
    amount: number;
  };
};

enum ShirtColor {
  Red = 'Red',
  Blue = 'Blue',
  Green = 'Green',
  Yellow = 'Yellow',
  Black = 'Black',
  White = 'White',
}

// Gitbutler test

/**
 * 주문을 받아 셔츠를 준비하는 서비스
 *  - 주문을 받을 수 있다.
 *  - 주문을 업데이트 할 수 있다.
 *  - 무료 증정 셔츠를 줄 수 있되 색상은 고르거나 가장 적게 팔린 색상을 준다.
 */
@Injectable()
export class ShortOrderService {
  private readonly orderMap = new Map<UserId, OrderData[]>();
  private readonly salesMap = new Map<ShirtColor, number>();

  constructor() {
    // salesMap을 모든 색상이 0으로 설정하여 초기화
    Object.values(ShirtColor).forEach((color) => this.salesMap.set(color, 0));
  }

  orderShort(params: OrderParams | UpdateOrderParams): void {
    if (params.type === 'Order') {
      this.order(params);
    } else {
      this.updateOrder(params);
    }
  }

  /**
   * 주문을 받아 셔츠를 준비한다.
   * @param params
   * @private
   */
  private order(params: OrderParams): void {
    const { userId, shirtColor, amount } = params.date;
    const orderData = this.orderMap.get(userId) || [];
    orderData.push({ date: new Date().toISOString(), shirtColor, amount });
    this.orderMap.set(userId, orderData);

    this.salesMap.set(
      shirtColor,
      (this.salesMap.get(shirtColor) || 0) + amount,
    );
  }

  /**
   * 주문을 업데이트한다.
   * @param params
   * @private
   */
  private updateOrder(params: UpdateOrderParams): void {
    const { date, userId, shirtColor, amount } = params.date;
    const orderData = this.orderMap.get(userId) || [];
    const index = orderData.findIndex((data) => data.date === date);
    if (index === -1) {
      throw new Error('주문 기록이 없습니다.');
    }

    // 기존 주문의 셔츠 색상을 찾아 salesMap에서 감소
    const oldShirtColor = orderData[index].shirtColor;
    this.salesMap.set(
      oldShirtColor,
      (this.salesMap.get(oldShirtColor) || 0) - orderData[index].amount,
    );

    // 새로운 셔츠 색상의 카운트를 증가
    this.salesMap.set(
      shirtColor,
      (this.salesMap.get(shirtColor) || 0) + amount,
    );

    orderData[index] = { date, shirtColor, amount };
    this.orderMap.set(userId, orderData);
  }

  giveFreeShort(shortColor?: ShirtColor): ShirtColor {
    return shortColor || this.getLeastSoldColor();
  }

  private getLeastSoldColor(): ShirtColor {
    let leastSoldColor: ShirtColor = ShirtColor.Red;
    let leastSoldAmount: number = Infinity;

    this.salesMap.forEach((amount, color) => {
      if (amount < leastSoldAmount) {
        leastSoldColor = color;
        leastSoldAmount = amount;
      }
    });

    return leastSoldColor;
  }

  private isoStringToUnixTime(isoString: string): number {
    return Date.parse(isoString);
  }
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: `
    <div>
      <h1>Short Order Service</h1>
      <p>주문을 받아 셔츠를 준비합니다.</p>
      <p>
        무료 증정 셔츠를 줄 수 있되 색상은 고르거나 가장 적게 팔린 색상을
        줍니다.
      </p>
    </div>
    <button (click)="orderShort()">주문하기</button>
  `,
  providers: [ShortOrderService],
})
export class AppComponent {
  private readonly orderData = inject(ShortOrderService);

  constructor() {}

  orderShort(): void {
    const userId = 'test';
    const shirtColor = ShirtColor.Red;
    const amount = 1;
    this.orderData.orderShort({
      type: 'Order',
      date: { userId, shirtColor, amount },
    });
  }

  updateOrder(): void {
    const userId = 'test';
    const shirtColor = ShirtColor.Red;
    const amount = 1;
    const date = new Date().toISOString();
    this.orderData.orderShort({
      type: 'UpdateOrder',
      date: { date, userId, shirtColor, amount },
    });
  }

  giveFreeShort(): void {
    const freeShirtColor = this.orderData.giveFreeShort();
    console.log(`무료 증정 셔츠 색상: ${freeShirtColor}`);
  }
}
