import { TestBed, tick, fakeAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { JsonPipe  } from '@angular/common';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HomeComponent } from './home.component';
import { FeedService } from '../feed.service';
import { Observable, Observer } from 'rxjs';
import { MockDataA, MockDataB, MockDataC } from '../mockdata';

describe('User Async Component:', () => {
  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [FeedService, JsonPipe],
      imports: [HttpClientTestingModule, FormsModule]
    });
  });

  describe(':', () => {
    function setup() {
      const fixture = TestBed.createComponent(HomeComponent);
      const component = fixture.debugElement.componentInstance;
      const httpTestingController = TestBed.get(HttpTestingController);
      const service = fixture.debugElement.injector.get(
        FeedService
      );

      return { fixture, component, service, httpTestingController };
    }

    it('should create the component', () => {
      const { component } = setup();
      expect(component).toBeTruthy();
    });

    it('should be ok', fakeAsync( () => {
      const { fixture, component, service } = setup();
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        let textarea = fixture.debugElement.query(By.css('#textarea'));
        let el = textarea.nativeElement;  
        el.value = JSON.stringify(MockDataA);
        console.log(el.value);
        el.dispatchEvent(new Event('input'));
        let button = fixture.debugElement.query(By.css('#clean'));
        button.triggerEventHandler('click', null);
        tick();
        fixture.detectChanges();
        console.log('after');
        let textareaafter = fixture.debugElement.query(By.css('#textarea'));
        let elafter = textareaafter.nativeElement;  
        console.log(elafter.value);
        console.log(fixture.componentInstance.source);
        expect(fixture.componentInstance.source).toBeTruthy();

      });
    }));
  });
});