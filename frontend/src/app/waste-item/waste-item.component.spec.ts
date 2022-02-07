import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WasteItemComponent } from './waste-item.component';

describe('WasteItemComponent', () => {
  let component: WasteItemComponent;
  let fixture: ComponentFixture<WasteItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WasteItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WasteItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
