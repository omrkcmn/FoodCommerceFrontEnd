import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOrderDetailPageComponent } from './admin-order-detail-page.component';

describe('AdminOrderDetailPageComponent', () => {
  let component: AdminOrderDetailPageComponent;
  let fixture: ComponentFixture<AdminOrderDetailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminOrderDetailPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminOrderDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
