import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WasteItemSubtypeComponent } from './waste-item-subtype.component';

describe('WasteItemSubtypeComponent', () => {
  let component: WasteItemSubtypeComponent;
  let fixture: ComponentFixture<WasteItemSubtypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WasteItemSubtypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WasteItemSubtypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
