import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderResultPage } from './order-result.page';

describe('PaidResultPage', () => {
  let component: OrderResultPage;
  let fixture: ComponentFixture<OrderResultPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderResultPage ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderResultPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
