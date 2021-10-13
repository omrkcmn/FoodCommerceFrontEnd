import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestAddComponent } from './rest-add.component';

describe('RestAddComponent', () => {
  let component: RestAddComponent;
  let fixture: ComponentFixture<RestAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
