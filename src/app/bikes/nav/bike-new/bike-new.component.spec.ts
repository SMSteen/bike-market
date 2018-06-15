import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BikeNewComponent } from './bike-new.component';

describe('BikeNewComponent', () => {
  let component: BikeNewComponent;
  let fixture: ComponentFixture<BikeNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BikeNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BikeNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
