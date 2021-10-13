import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestUpdateComponent } from './rest-update.component';

describe('RestUpdateComponent', () => {
  let component: RestUpdateComponent;
  let fixture: ComponentFixture<RestUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
