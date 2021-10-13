import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodDeleteComponent } from './food-delete.component';

describe('FoodDeleteComponent', () => {
  let component: FoodDeleteComponent;
  let fixture: ComponentFixture<FoodDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoodDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
