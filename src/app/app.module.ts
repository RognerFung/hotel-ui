import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule  } from '@angular/common/http';
import { JsonPipe  } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { FeedService } from './feed.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    FeedService,
    JsonPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
