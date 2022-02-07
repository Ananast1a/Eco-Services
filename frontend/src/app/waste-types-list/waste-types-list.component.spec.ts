import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WasteTypesListComponent } from './waste-types-list.component';

describe('WasteTypesListComponent', () => {
  let component: WasteTypesListComponent;
  let fixture: ComponentFixture<WasteTypesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WasteTypesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WasteTypesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
