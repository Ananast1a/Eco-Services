import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcoStationAdderComponent } from './eco-station-adder.component';

describe('EcoStationAdderComponent', () => {
  let component: EcoStationAdderComponent;
  let fixture: ComponentFixture<EcoStationAdderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EcoStationAdderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EcoStationAdderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
