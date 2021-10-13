import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestourantCommentComponent } from './restourant-comment.component';

describe('RestourantCommentComponent', () => {
  let component: RestourantCommentComponent;
  let fixture: ComponentFixture<RestourantCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestourantCommentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestourantCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
