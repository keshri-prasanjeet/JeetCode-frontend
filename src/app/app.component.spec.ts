import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {RouterTestingModule} from "@angular/router/testing";
import {ActivatedRoute} from "@angular/router";
import {HomePageComponent} from "./pages/home-page/home-page.component";

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AppComponent,
        HomePageComponent,
        RouterTestingModule,
      ],
      providers:
        [
          {
            provide: ActivatedRoute,
            useValue: {
              snapshot: {path: '/home'}
            }
          }
        ]
    });
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have the 'a16-standalone' title`, () => {
    expect(component.title).toEqual('a16-standalone');
  });

  it('should render container', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.app-container')).toBeTruthy();
  });

  it('should render menu', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.app-container')?.textContent).toContain('A16 | with routing');
  });
});
