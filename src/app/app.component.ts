import { Component } from '@angular/core';
import {Messwerte} from './messwerte';
import {MesswerteService} from './messwerte.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Metabolon-frontend';

  graph1Data: Messwerte[];

  constructor(private messwerteService: MesswerteService) {
    this.messwerteService.getForGraph1().subscribe(
      messwerten => this.graph1Data = messwerten
    );
  }
}
