import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { Graph1Component } from './graph1/graph1.component';
import { MonthFormatterPipe } from './month-formatter.pipe';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

@NgModule({
  declarations: [
    AppComponent,
    Graph1Component,
    MonthFormatterPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatButtonToggleModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
