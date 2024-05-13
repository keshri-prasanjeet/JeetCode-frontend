import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodemirComponent } from './codemir.component';

describe('CodemirComponent', () => {
  let component: CodemirComponent;
  let fixture: ComponentFixture<CodemirComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CodemirComponent]
    });
    fixture = TestBed.createComponent(CodemirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
