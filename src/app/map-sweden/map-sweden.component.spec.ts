import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapSwedenComponent } from './map-sweden.component';

describe('MapSwedenComponent', () => {
  let component: MapSwedenComponent;
  let fixture: ComponentFixture<MapSwedenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapSwedenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapSwedenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
