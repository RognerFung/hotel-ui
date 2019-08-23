import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  constructor(
    private http: HttpClient
  ) { }

	getFromApi(): Observable<any> {
		return this.http.get('http://127.0.0.1:3000/api');
  }
  
	postToApi(data): Observable<any> {
		return this.http.post('http://127.0.0.1:3000/api', {data});
  }

}
