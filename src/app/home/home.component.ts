import { Component } from '@angular/core';
import { FeedService } from 'src/app/feed.service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  rawData: any = [];
  cleanData: any;
  inputData: string;
  source: any;
  sourceA: string = 'https://api.myjson.com/bins/gdmqa';
  sourceB: string = 'https://api.myjson.com/bins/1fva3m';
  sourceC: string = 'https://api.myjson.com/bins/j6kzm';
  loader: boolean;
  label: string;

  constructor(
    public feedService: FeedService,
    private jsonPipe: JsonPipe
  ) { }

  onLoad(char) {
    this.loader = true;
    this.feedService.getFromApi(this[`source${char}`]).subscribe(data => {
      if (data) {
        this.rawData = [...this.rawData, ...data];
        this.source = this.jsonPipe.transform(this.rawData)
        this.loader = false;
        if (this.label) {
          this.label += `, Source ${char}`;
        } else {
          this.label = `Following source data merged: Source ${char}`;
        }
      }
    });
  }

  onReset() {
    this.source = undefined;
    this.rawData = [];
    this.label = undefined;
  }

  onClean() {
    this.feedService.postToApi(JSON.parse(this.source)).subscribe(data => {
      if (data) {
        this.cleanData = data;
        this.source = this.jsonPipe.transform(data);
        this.label = 'Data is cleaned';
      }
    });
  }

  onChange() {
    if (this.inputData) {
      const changedData = this.cleanData.filter(e => e.id.toLowerCase().includes(this.inputData.toLowerCase()) || e.destination_id.toString().includes(this.inputData));
      this.source = this.jsonPipe.transform(changedData);
    } else {
      this.source = this.jsonPipe.transform(this.cleanData);
    }
  }

  onSearch() {
    if (this.inputData) {
      const changedData = this.cleanData.filter(e => e.id.toLowerCase().includes(this.inputData.toLowerCase()) || e.destination_id.toString().includes(this.inputData));
      this.label = `You have found ${changedData.length} record${changedData.length === 1 ? '' : 's'}. Hotel name${changedData.length === 1 ? ' is' : 's are'} `;
      changedData.forEach(e => this.label += `${e.name}, `);
      this.label = this.label.slice(0, -2);
    }
  }
}
