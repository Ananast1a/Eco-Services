import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcoStationPageComponent } from './eco-station-page.component';

describe('EcoStationPageComponent', () => {
  let component: EcoStationPageComponent;
  let fixture: ComponentFixture<EcoStationPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EcoStationPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EcoStationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
