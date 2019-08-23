import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from  '@angular/common/http/testing';
import { FeedService } from './feed.service';
import { MockDataA, MockDataB, MockDataC } from './mockdata'

describe('FeedService', () => {

  let httpTestingController: HttpTestingController;
  let service: FeedService;

  beforeEach((
    () => {
      TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FeedService]
    }).compileComponents();
  }));

  beforeEach(() => {
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(FeedService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('send post request to retrieve images with tags', () => {

    service.postToApi(MockDataA)
      .subscribe(data => {
        expect(data).toBeTruthy();
      });

    const req = httpTestingController.expectOne('http://127.0.0.1:3000/api');

    req.flush(MockDataA);
  });

});
