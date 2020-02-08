import {ChangeDetectionStrategy, Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import {Messwerte} from '../messwerte';
import {ValueLine} from '../value-line';

import * as d3 from 'd3';

@Component({
  selector: 'app-graph1',
  templateUrl: './graph1.component.html',
  styleUrls: ['./graph1.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Graph1Component implements OnChanges {

  constructor() { }

  private currentValueLine: ValueLine;

  // @ts-ignore
  @ViewChild('chart')
  chartElement: ElementRef;

  @Input()
  messwerten: Messwerte[];

  private svgElement: HTMLElement;
  private chartProps: any;

  ngOnChanges(changes: SimpleChanges): void {
    if (this.messwerten) {
      this.buildChart(this.currentValueLine);
    }
  }

  formatDate() {
    this.messwerten.forEach(m => {
      if (m.datum == null) {
        m.datum = new Date(m.year, m.month - 1, 1, 0, 0, 0, 0);
      }
    });
  }

  buildChart(valueLine: ValueLine) {
    this.currentValueLine = valueLine;

    this.chartProps = {};
    this.formatDate();

    // Set the dimensions of the canvas / graph
    // tslint:disable-next-line:prefer-const one-variable-per-declaration
    const margin = { top: 30, right: 40, bottom: 30, left: 50 };
    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    // Set the ranges
    this.chartProps.x = d3.scaleTime().range([0, width]);
    this.chartProps.y = d3.scaleLinear().range([height, 0]);

    // Define the axes
    const xAxis = d3.axisBottom(this.chartProps.x);
    const yAxis = d3.axisLeft(this.chartProps.y).ticks(5);

    // tslint:disable-next-line:variable-name
    const _this = this;

    // Define the line 1
    const aussentemeraturValueLine = d3.line<Messwerte>()
      .x( d => {
        if (d.datum instanceof Date) {
          return _this.chartProps.x(d.datum.getTime());
        }
      })
      .y(d => { console.log('Aussentemperatur'); return _this.chartProps.y(d.aussentemperatur); });

    // Define the line 2
    const niederschlagValueLine = d3.line<Messwerte>()
      .x( d => {
        if (d.datum instanceof Date) {
          return _this.chartProps.x(d.datum.getTime());
        }
      })
      .y(d => { console.log('Niederschlag'); return _this.chartProps.y(d.niederschlag); });

    const svg = d3.select(this.chartElement.nativeElement)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Scale the range of the data
    this.chartProps.x.domain(
      d3.extent(_this.messwerten, d => {
        if (d.datum instanceof Date) {
          return (d.datum as Date).getTime();
        }
      }));
    this.chartProps.y.domain([0, d3.max(this.messwerten, d => {
      if (valueLine === ValueLine.AUSSENTEMPERATUR) {
        return Math.max(d.aussentemperatur);
      } else if (valueLine === ValueLine.NIEDERSCHLAG) {
        return Math.max(d.niederschlag);
      }
    })]);

    let dValueLine;
    let cyScatterplot;
    if (valueLine === ValueLine.AUSSENTEMPERATUR) {
      dValueLine = aussentemeraturValueLine(_this.messwerten);

    } else if (valueLine === ValueLine.NIEDERSCHLAG) {
      dValueLine = niederschlagValueLine(_this.messwerten);
    }

    // Add the valueline path.
    svg.append('path')
      .attr('class', 'line line1')
      .style('stroke', 'red')
      .style('fill', 'none')
      .attr('d', dValueLine);

    if (valueLine === ValueLine.AUSSENTEMPERATUR) {
      // Add the scatterplot
      svg.selectAll('dot')
        .data(this.messwerten)
        .enter().append('circle')
        .style('fill', 'blue')
        .attr('r', 3.5)
        .attr('cx', d => _this.chartProps.x(d.datum))
        .attr('cy', d => _this.chartProps.y(d.aussentemperatur));
    } else if (valueLine === ValueLine.NIEDERSCHLAG) {
      // Add the scatterplot
      svg.selectAll('dot')
        .data(this.messwerten)
        .enter().append('circle')
        .style('fill', 'blue')
        .attr('r', 3.5)
        .attr('cx', d => _this.chartProps.x(d.datum))
        .attr('cy', d => _this.chartProps.y(d.niederschlag));
    }

    // Add the X Axis
    svg.append('g')
      .attr('class', 'x axis')
      .attr('transform', `translate(0,${height})`)
      .call(xAxis);

    // Add the Y Axis
    svg.append('g')
      .attr('class', 'y axis')
      .call(yAxis);

    // Setting the required objects in chartProps so they could be used to update the chart
    this.chartProps.svg = svg;
    this.chartProps.valueline = aussentemeraturValueLine;
    this.chartProps.valueline2 = aussentemeraturValueLine;
    this.chartProps.xAxis = xAxis;
    this.chartProps.yAxis = yAxis;
  }
}
