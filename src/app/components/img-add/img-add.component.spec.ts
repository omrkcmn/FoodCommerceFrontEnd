import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgAddComponent } from './img-add.component';

describe('ImgAddComponent', () => {
  let component: ImgAddComponent;
  let fixture: ComponentFixture<ImgAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImgAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImgAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
