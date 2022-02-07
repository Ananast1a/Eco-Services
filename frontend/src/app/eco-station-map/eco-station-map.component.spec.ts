import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcoStationMapComponent } from './eco-station-map.component';

describe('EcoStationMapComponent', () => {
  let component: EcoStationMapComponent;
  let fixture: ComponentFixture<EcoStationMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EcoStationMapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EcoStationMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
