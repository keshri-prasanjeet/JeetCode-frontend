import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResizeTestComponent } from './resize-test.component';

describe('ResizeTestComponent', () => {
  let component: ResizeTestComponent;
  let fixture: ComponentFixture<ResizeTestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ResizeTestComponent]
    });
    fixture = TestBed.createComponent(ResizeTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
