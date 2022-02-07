import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcoStationSidebarComponent } from './eco-station-sidebar.component';

describe('EcoServicesSidebarComponent', () => {
  let component: EcoStationSidebarComponent;
  let fixture: ComponentFixture<EcoStationSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EcoStationSidebarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EcoStationSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
