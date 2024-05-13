import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProblemsListPageComponent } from './problems-list-page.component';

describe('ProblemsListPageComponent', () => {
  let component: ProblemsListPageComponent;
  let fixture: ComponentFixture<ProblemsListPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ProblemsListPageComponent]
    });
    fixture = TestBed.createComponent(ProblemsListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
