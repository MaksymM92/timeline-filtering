import {OnInit, Component} from '@angular/core';
import {DATA} from "../assets/data";

export interface tableData {
  place: string;
  magnitude: number;
  depth: number;
  distance: number;
  time: number
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'timeline-filtering';
  timeStart: number;
  timeEnd: number;

  constructor() {
    this.timeStart = 1609444800000;
    this.timeEnd = 1640980799000;
  }

  data: tableData[] | any;

  ngOnInit() {
    this.data = DATA;
  }

  filter(newDateRange: any) {
    this.timeStart = newDateRange.tsMin;
    this.timeEnd = newDateRange.tsMax;
  }
}
