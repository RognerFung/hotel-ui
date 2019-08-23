import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        AppComponent
      ],
    }).compileComponents();
  }));

  it('should be created', () => {
    const comp = TestBed.get(AppComponent);
    expect(comp).toBeTruthy();
  });
});
