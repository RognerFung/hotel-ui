import { Component } from '@angular/core';
import { FeedService } from 'src/app/feed.service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  source: any;

  constructor(
    public feedService: FeedService,
    private jsonPipe: JsonPipe
  ) { }

  onReset() {
    this.source = undefined;
  }

  onClean() {
    this.feedService.postToApi(JSON.parse(this.source)).subscribe(data => {
      if (data) {
        this.source = this.jsonPipe.transform(data);
      }
    });
  }
}
