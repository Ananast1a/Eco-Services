import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WasteTypeComponent } from './waste-type.component';

describe('WasteTypeComponent', () => {
  let component: WasteTypeComponent;
  let fixture: ComponentFixture<WasteTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WasteTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WasteTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
