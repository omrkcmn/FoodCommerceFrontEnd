import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUserOrdersComponent } from './admin-user-orders.component';

describe('AdminUserOrdersComponent', () => {
  let component: AdminUserOrdersComponent;
  let fixture: ComponentFixture<AdminUserOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminUserOrdersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUserOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
