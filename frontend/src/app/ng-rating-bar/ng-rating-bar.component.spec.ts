import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgRatingBarComponent } from './ng-rating-bar.component';

describe('NgRatingBarComponent', () => {
  let component: NgRatingBarComponent;
  let fixture: ComponentFixture<NgRatingBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgRatingBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgRatingBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
