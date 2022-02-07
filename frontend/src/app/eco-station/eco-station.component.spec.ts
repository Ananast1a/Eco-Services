import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcoStationComponent } from './eco-station.component';

describe('EcoStationComponent', () => {
  let component: EcoStationComponent;
  let fixture: ComponentFixture<EcoStationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EcoStationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EcoStationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
